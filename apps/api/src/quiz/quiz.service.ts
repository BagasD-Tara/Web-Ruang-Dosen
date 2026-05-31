import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    courseId: string;
    xpReward: number;
    passingScore: number;
    timeLimit?: number;
  }) {
    // 1. check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2. create quiz
    const quiz = await this.prisma.quiz.create({
      data: {
        title: data.title,
        courseId: data.courseId,
        xpReward: data.xpReward,
        passingScore: data.passingScore,
        timeLimit: data.timeLimit ?? 30,
      },
    });

    return quiz;
  }

  async findAll(courseId?: string) {
    return this.prisma.quiz.findMany({
      where: courseId ? { courseId } : {},
      select: {
        id: true,
        title: true,
        xpReward: true,
        passingScore: true,
        timeLimit: true,
        _count: {
          select: { questions: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Protection: Remove correctAnswer from each question
    const sanitizedQuestions = quiz.questions.map((q) => {
      const { correctAnswer: _correctAnswer, ...rest } = q;
      return rest;
    });

    return {
      ...quiz,
      questions: sanitizedQuestions,
    };
  }

  async update(
    id: string,
    userId: string,
    data: {
      title?: string;
      timeLimit?: number;
      xpReward?: number;
      passingScore?: number;
    },
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Validation: Only course instructor can update
    if (quiz.course.instructorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this quiz',
      );
    }

    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Validation: Only course instructor can remove
    if (quiz.course.instructorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this quiz',
      );
    }

    return this.prisma.quiz.delete({
      where: { id },
    });
  }

  async submit(
    id: string,
    userId: string,
    answers: { questionId: string; answer: string }[],
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    let correctCount = 0;
    const totalQuestions = quiz.questions.length;
    const details: any[] = [];

    for (const q of quiz.questions) {
      const studentAnswer =
        answers.find((a) => a.questionId === q.id)?.answer || null;
      const isCorrect = studentAnswer === q.correctAnswer;

      if (isCorrect) correctCount++;

      details.push({
        questionId: q.id,
        question: q.question,
        correctAnswer: q.correctAnswer,
        studentAnswer: studentAnswer,
        isCorrect,
      });
    }

    const score =
      totalQuestions > 0
        ? Math.round((correctCount / totalQuestions) * 100)
        : 0;
    const passed = score >= quiz.passingScore;
    let xpGained = 0;

    if (passed) {
      xpGained = quiz.xpReward;
      // Increment XP
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: xpGained },
        },
      });
    }

    return {
      score,
      passed,
      xpGained,
      details,
    };
  }

  async createQuestion(
    userId: string,
    data: {
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: string;
      quizId: string;
    },
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: data.quizId },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    if (quiz.course.instructorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to add questions to this quiz',
      );
    }

    return this.prisma.quizQuestion.create({
      data: {
        quizId: data.quizId,
        question: data.question,
        options: {
          optionA: data.optionA,
          optionB: data.optionB,
          optionC: data.optionC,
          optionD: data.optionD,
        },
        correctAnswer: data.correctAnswer,
      },
    });
  }

  async getQuestionsForQuiz(quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const questions = await this.prisma.quizQuestion.findMany({
      where: { quizId },
    });

    return questions.map((q) => {
      const opts = (q.options as Record<string, string>) || {};
      return {
        id: q.id,
        question: q.question,
        optionA: opts.optionA ?? '',
        optionB: opts.optionB ?? '',
        optionC: opts.optionC ?? '',
        optionD: opts.optionD ?? '',
      };
    });
  }

  async updateQuestion(
    id: string,
    userId: string,
    data: {
      question?: string;
      optionA?: string;
      optionB?: string;
      optionC?: string;
      optionD?: string;
      correctAnswer?: string;
    },
  ) {
    const question = await this.prisma.quizQuestion.findUnique({
      where: { id },
      include: {
        quiz: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundException('Quiz question not found');
    }

    if (question.quiz.course.instructorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this question',
      );
    }

    const currentOpts = (question.options as Record<string, string>) || {};
    const updatedOpts = {
      optionA: data.optionA !== undefined ? data.optionA : currentOpts.optionA,
      optionB: data.optionB !== undefined ? data.optionB : currentOpts.optionB,
      optionC: data.optionC !== undefined ? data.optionC : currentOpts.optionC,
      optionD: data.optionD !== undefined ? data.optionD : currentOpts.optionD,
    };

    return this.prisma.quizQuestion.update({
      where: { id },
      data: {
        question: data.question,
        options: updatedOpts,
        correctAnswer: data.correctAnswer,
      },
    });
  }

  async deleteQuestion(id: string, userId: string) {
    const question = await this.prisma.quizQuestion.findUnique({
      where: { id },
      include: {
        quiz: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundException('Quiz question not found');
    }

    if (question.quiz.course.instructorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this question',
      );
    }

    return this.prisma.quizQuestion.delete({
      where: { id },
    });
  }
}

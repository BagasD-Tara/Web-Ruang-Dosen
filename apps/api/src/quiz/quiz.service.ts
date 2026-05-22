import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) { }

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
      const { correctAnswer, ...rest } = q;
      return rest;
    });

    return {
      ...quiz,
      questions: sanitizedQuestions,
    };
  }

  async update(id: string, user: { id: string; role: string }, data: {
    title?: string;
    timeLimit?: number;
    xpReward?: number;
    passingScore?: number;
  }) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Validation: Only course instructor can update
    if (quiz.course.instructorId !== user.id) {
      throw new ForbiddenException('You are not authorized to update this quiz');
    }

    return this.prisma.quiz.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, user: { id: string; role: string }) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Validation: Only course instructor or admin can remove
    if (quiz.course.instructorId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException('You are not authorized to delete this quiz');
    }

    return this.prisma.quiz.delete({
      where: { id },
    });
  }

  async findQuestions(quizId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    return quiz.questions.map((q) => {
      const opts = q.options as any;
      return {
        id: q.id,
        question: q.question,
        optionA: opts?.optionA || opts?.A,
        optionB: opts?.optionB || opts?.B,
        optionC: opts?.optionC || opts?.C,
        optionD: opts?.optionD || opts?.D,
      };
    });
  }

  async createQuestion(
    data: {
      quizId: string;
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: string;
    },
    user: { id: string; role: string },
  ) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: data.quizId },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    if (quiz.course.instructorId !== user.id) {
      throw new ForbiddenException('You are not authorized to add questions to this quiz');
    }

    return this.prisma.quizQuestion.create({
      data: {
        quizId: data.quizId,
        question: data.question,
        correctAnswer: data.correctAnswer,
        options: {
          optionA: data.optionA,
          optionB: data.optionB,
          optionC: data.optionC,
          optionD: data.optionD,
        },
      },
    });
  }

  async updateQuestion(
    id: string,
    data: {
      question?: string;
      optionA?: string;
      optionB?: string;
      optionC?: string;
      optionD?: string;
      correctAnswer?: string;
    },
    user: { id: string; role: string },
  ) {
    const question = await this.prisma.quizQuestion.findUnique({
      where: { id },
      include: { quiz: { include: { course: true } } },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.quiz.course.instructorId !== user.id) {
      throw new ForbiddenException('You are not authorized to update this question');
    }

    const currentOptions = question.options as any;
    const updatedOptions = {
      optionA: data.optionA !== undefined ? data.optionA : (currentOptions?.optionA || currentOptions?.A),
      optionB: data.optionB !== undefined ? data.optionB : (currentOptions?.optionB || currentOptions?.B),
      optionC: data.optionC !== undefined ? data.optionC : (currentOptions?.optionC || currentOptions?.C),
      optionD: data.optionD !== undefined ? data.optionD : (currentOptions?.optionD || currentOptions?.D),
    };

    return this.prisma.quizQuestion.update({
      where: { id },
      data: {
        question: data.question,
        correctAnswer: data.correctAnswer,
        options: updatedOptions,
      },
    });
  }

  async deleteQuestion(id: string, user: { id: string; role: string }) {
    const question = await this.prisma.quizQuestion.findUnique({
      where: { id },
      include: { quiz: { include: { course: true } } },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    if (question.quiz.course.instructorId !== user.id) {
      throw new ForbiddenException('You are not authorized to delete this question');
    }

    return this.prisma.quizQuestion.delete({
      where: { id },
    });
  }
}
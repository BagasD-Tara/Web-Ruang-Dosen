import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async update(id: string, userId: string, data: {
    title?: string;
    timeLimit?: number;
    xpReward?: number;
  }) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Validation: Only course instructor can update
    if (quiz.course.instructorId !== userId) {
      throw new ForbiddenException('You are not authorized to update this quiz');
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
      throw new ForbiddenException('You are not authorized to delete this quiz');
    }

    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
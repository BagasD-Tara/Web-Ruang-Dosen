import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) { }

  async create(data: {
    title: string;
    courseId: string;
    xpReward: number;
    minScore: number;
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
        minScore: data.minScore,
      },
    });

    return quiz;
  }
}
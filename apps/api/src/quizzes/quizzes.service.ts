import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Quiz } from '@prisma/client';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) { }

  async create(title: string, courseId: string, xpReward: number, minScore: number): Promise<Quiz> {
    // Cek dulu courseId-nya ada gak di DB
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    // Kalau ada, simpan quiz baru
    const quiz = await this.prisma.quiz.create({
      data: {
        title,
        courseId,
        xpReward,
        minScore,
      },
    });

    return quiz;
  }
}

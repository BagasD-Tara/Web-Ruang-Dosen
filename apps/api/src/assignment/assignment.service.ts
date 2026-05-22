import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Assignment } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; description: string; courseId: string }): Promise<Assignment> {
    // 1. check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2. create assignment
    const assignment = await this.prisma.assignment.create({
      data: {
        title: data.title,
        description: data.description,
        courseId: data.courseId,
      },
    });

    return assignment;
  }
}

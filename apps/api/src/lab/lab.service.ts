import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LabService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    data: { title: string; instructions: string; courseId: string },
  ) {
    const course = await this.prisma.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenException(
        'Forbidden: Only the instructor can create a lab for this course',
      );
    }

    return this.prisma.practicalLab.create({
      data: {
        title: data.title,
        instructions: data.instructions,
        courseId: data.courseId,
      },
    });
  }

  async findAll(courseId?: string) {
    return this.prisma.practicalLab.findMany({
      where: courseId ? { courseId } : {},
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const lab = await this.prisma.practicalLab.findUnique({
      where: { id },
    });

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }

    return lab;
  }

  async update(
    id: string,
    userId: string,
    data: { title?: string; instructions?: string },
  ) {
    const lab = await this.prisma.practicalLab.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }

    if (lab.course.instructorId !== userId) {
      throw new ForbiddenException(
        'Forbidden: Only the instructor can update this lab',
      );
    }

    return this.prisma.practicalLab.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    const lab = await this.prisma.practicalLab.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }

    if (lab.course.instructorId !== userId) {
      throw new ForbiddenException(
        'Forbidden: Only the instructor can delete this lab',
      );
    }

    return this.prisma.practicalLab.delete({
      where: { id },
    });
  }
}

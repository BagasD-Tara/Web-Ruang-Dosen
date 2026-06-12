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
    data: { title: string; instructions: string; moduleId: string },
  ) {
    const module = await this.prisma.courseModule.findUnique({
      where: { id: data.moduleId },
      include: { course: true },
    });

    if (!module) {
      throw new NotFoundException('Module not found');
    }

    if (module.course.instructorId !== userId) {
      throw new ForbiddenException(
        'Forbidden: Only the instructor can create a lab for this course',
      );
    }

    return this.prisma.practicalLab.create({
      data: {
        title: data.title,
        instructions: data.instructions,
        moduleId: data.moduleId,
      },
    });
  }

  async findAll(moduleId?: string) {
    return this.prisma.practicalLab.findMany({
      where: moduleId ? { moduleId } : {},
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
      include: { module: { include: { course: true } } },
    });

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }

    if (lab.module.course.instructorId !== userId) {
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
      include: { module: { include: { course: true } } },
    });

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }

    if (lab.module.course.instructorId !== userId) {
      throw new ForbiddenException(
        'Forbidden: Only the instructor can delete this lab',
      );
    }

    return this.prisma.practicalLab.delete({
      where: { id },
    });
  }
}

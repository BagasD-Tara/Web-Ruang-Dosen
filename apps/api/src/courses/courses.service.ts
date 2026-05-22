import { ForbiddenException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            xp: true,
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        materials: true,
        quizzes: true,
        assignments: true,
        labs: true,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async createMaterial(data: any, userId: string) {
    const title = data?.title || data?.judul;
    const type = data?.type || data?.tipe;
    const content = data?.content || data?.konten;
    const courseId = data?.courseId;

    if (!title) {
      throw new BadRequestException('Title (judul) is required');
    }
    if (!type) {
      throw new BadRequestException('Type (tipe) is required');
    }
    if (!content) {
      throw new BadRequestException('Content (konten) is required');
    }
    if (!courseId) {
      throw new BadRequestException('Course ID (courseId) is required');
    }

    const upperType = type.toUpperCase();
    if (upperType !== 'TEXT' && upperType !== 'VIDEO' && upperType !== 'DOCUMENT') {
      throw new BadRequestException('Type must be TEXT, VIDEO, or DOCUMENT');
    }

    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: true },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    if (!userId) {
      throw new ForbiddenException('User identification is required to create a material');
    }

    if (course.instructorId !== userId || course.instructor.role !== 'LECTURER') {
      throw new ForbiddenException('Only the lecturer owning this course can create materials');
    }

    const materialData: any = {
      title,
      type: upperType,
      courseId,
    };

    if (upperType === 'TEXT') {
      materialData.content = content;
      materialData.url = null;
    } else {
      materialData.url = content;
      materialData.content = null;
    }

    return this.prisma.material.create({
      data: materialData,
    });
  }

  async findMaterialOne(id: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    const content = material.type === 'TEXT' ? material.content : material.url;

    return {
      id: material.id,
      title: material.title,
      judul: material.title,
      type: material.type,
      tipe: material.type,
      content,
      konten: content,
      courseId: material.courseId,
      createdAt: material.createdAt,
      updatedAt: material.updatedAt,
    };
  }

  async update(id: string, data: any, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenException('You are not the instructor of this course');
    }

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, userId: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    if (course.instructorId !== userId) {
      throw new ForbiddenException('You are not the instructor of this course');
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}

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

  async updateMaterial(id: string, data: any, userId: string) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        course: {
          include: { instructor: true },
        },
      },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    if (!userId) {
      throw new ForbiddenException('User identification is required to update a material');
    }

    if (material.course.instructorId !== userId || material.course.instructor.role !== 'LECTURER') {
      throw new ForbiddenException('Only the lecturer owning this course can update this material');
    }

    const title = data?.title || data?.judul;
    const type = data?.type || data?.tipe;
    const content = data?.content || data?.konten;

    const updateData: any = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    const finalType = type ? type.toUpperCase() : material.type;

    if (type !== undefined) {
      if (finalType !== 'TEXT' && finalType !== 'VIDEO' && finalType !== 'DOCUMENT') {
        throw new BadRequestException('Type must be TEXT, VIDEO, or DOCUMENT');
      }
      updateData.type = finalType;
    }

    if (content !== undefined) {
      if (finalType === 'TEXT') {
        updateData.content = content;
        updateData.url = null;
      } else {
        updateData.url = content;
        updateData.content = null;
      }
    } else if (type !== undefined && finalType !== material.type) {
      // If type changed but content was not provided, migrate the existing content to the correct field
      const existingVal = material.type === 'TEXT' ? material.content : material.url;
      if (finalType === 'TEXT') {
        updateData.content = existingVal;
        updateData.url = null;
      } else {
        updateData.url = existingVal;
        updateData.content = null;
      }
    }

    const updatedMaterial = await this.prisma.material.update({
      where: { id },
      data: updateData,
    });

    const finalContent = updatedMaterial.type === 'TEXT' ? updatedMaterial.content : updatedMaterial.url;

    return {
      id: updatedMaterial.id,
      title: updatedMaterial.title,
      judul: updatedMaterial.title,
      type: updatedMaterial.type,
      tipe: updatedMaterial.type,
      content: finalContent,
      konten: finalContent,
      courseId: updatedMaterial.courseId,
      createdAt: updatedMaterial.createdAt,
      updatedAt: updatedMaterial.updatedAt,
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

  async findMyCourses(userId: string) {
    if (!userId) {
      throw new ForbiddenException('User identification is required');
    }

    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
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
        },
      },
    });

    return enrollments.map((enrollment) => enrollment.course);
  }

  async removeMaterial(id: string, userId: string) {
    if (!userId) {
      throw new ForbiddenException('User identification is required to delete a material');
    }

    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        course: {
          include: { instructor: true },
        },
      },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    const requester = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    const isAdmin = requester?.role === 'ADMIN';
    const isCourseOwner = material.course.instructorId === userId && material.course.instructor.role === 'LECTURER';

    if (!isAdmin && !isCourseOwner) {
      throw new ForbiddenException('Only the lecturer owning this course or an admin can delete this material');
    }

    await this.prisma.material.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Material successfully deleted',
      pesan: 'Materi berhasil dihapus',
    };
  }
}

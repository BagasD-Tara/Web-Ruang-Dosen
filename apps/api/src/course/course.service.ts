import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    title: string;
    description?: string;
    instructorId: string;
  }): Promise<Course> {
    // 1. check if instructor exists
    const instructor = await this.prisma.user.findUnique({
      where: { id: data.instructorId },
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    // verify role
    if (instructor.role !== 'LECTURER' && instructor.role !== 'ADMIN') {
      throw new ForbiddenException('Only lecturers can create courses');
    }

    // 2. create course
    const course = await this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        instructorId: data.instructorId,
      },
    });

    return course;
  }

  async enroll(courseId: string, userId: string, userRole: string) {
    // 0. Only students can enroll
    if (userRole !== 'STUDENT') {
      throw new ForbiddenException('Only students can enroll in courses');
    }

    // 1. Check if course exists
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // 2. Check if already enrolled
    const existingEnrollment = await this.prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('You are already enrolled in this course');
    }

    // 3. Create enrollment
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
  }

  async getMyCourses(userId: string) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            instructor: {
              select: { name: true },
            },
          },
        },
      },
    });

    return enrollments.map((e) => e.course);
  }

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

  async update(
    id: string,
    data: { title?: string; description?: string },
    userId: string,
  ) {
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
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
      },
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

    // Delete enrollments first to avoid foreign key constraint errors
    await this.prisma.enrollment.deleteMany({
      where: { courseId: id },
    });

    return this.prisma.course.delete({
      where: { id },
    });
  }
}

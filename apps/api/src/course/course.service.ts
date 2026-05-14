import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; description?: string; instructorId: string }): Promise<Course> {
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

  async enroll(courseId: string, userId: string) {
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
      throw new BadRequestException('You are already enrolled in this course');
    }

    // 3. Create enrollment
    return this.prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
    });
  }
}

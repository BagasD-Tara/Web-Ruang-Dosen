import { Controller, Post, Body } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from '@prisma/client';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(
    @Body() data: { title: string; description?: string; instructorId: string }
  ): Promise<Course> {
    return this.courseService.create(data);
  }
}

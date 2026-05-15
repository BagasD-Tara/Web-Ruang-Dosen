import { Controller, Post, Body, UseGuards, Param, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @Post(':id/enroll')
  async enroll(@Param('id') id: string, @Request() req: any) {
    return this.courseService.enroll(id, req.user.id);
  }
}

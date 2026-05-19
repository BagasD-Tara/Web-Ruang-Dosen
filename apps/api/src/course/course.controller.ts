<<<<<<< Updated upstream
import { Controller, Post, Body, UseGuards, Param, Request } from '@nestjs/common';
=======
import { Controller, Post, Body, UseGuards, Param, Request, Get, Patch, Delete } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
>>>>>>> Stashed changes
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CourseService } from './course.service';
import { Course } from '@prisma/client';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiBody({ schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' }, instructorId: { type: 'string' } } } })
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
<<<<<<< Updated upstream
=======

  @Get()
  async findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({ schema: { type: 'object', properties: { title: { type: 'string' }, description: { type: 'string' } } } })
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: { title?: string; description?: string },
    @Request() req: any
  ) {
    const userId = req.user.id;
    return this.courseService.update(id, updateCourseDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id;
    return this.courseService.remove(id, userId);
  }
>>>>>>> Stashed changes
}

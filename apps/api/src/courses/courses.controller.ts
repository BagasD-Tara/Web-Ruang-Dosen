import { Controller, Get, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: any,
    @Request() req: any,
  ) {
    // Note: In a real application, ensure you have a JWT guard that populates req.user
    const userId = req.user?.id;
    return this.coursesService.update(id, updateCourseDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    // Note: In a real application, ensure you have a JWT guard that populates req.user
    const userId = req.user?.id;
    return this.coursesService.remove(id, userId);
  }
}

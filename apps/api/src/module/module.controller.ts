import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ModuleService } from './module.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses/:courseId/modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('courseId') courseId: string,
    @Body() data: { title: string; description?: string },
    @Request() req: any,
  ) {
    return this.moduleService.create(courseId, data.title, data.description, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Param('courseId') courseId: string) {
    return this.moduleService.findAllByCourse(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moduleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { title: string; description?: string },
    @Request() req: any,
  ) {
    return this.moduleService.update(id, data.title, data.description, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.moduleService.remove(id, req.user.id);
  }
}

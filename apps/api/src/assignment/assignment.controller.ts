import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@prisma/client';

@ApiBearerAuth('JWT-auth')
@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' },
        courseId: { type: 'string' },
      },
    },
  })
  async create(
    @Body()
    data: {
      title: string;
      description: string;
      deadline: string;
      moduleId: string;
    },
  ): Promise<Assignment> {
    return this.assignmentService.create({
      ...data,
      deadline: new Date(data.deadline),
    });
  }

  @Get()
  async findAll(@Query('courseId') courseId?: string) {
    return this.assignmentService.findAll(courseId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assignmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        deadline: { type: 'string', format: 'date-time' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() data: { title?: string; description?: string; deadline?: string },
    @Request() req: any,
  ) {
    return this.assignmentService.update(id, req.user.id, {
      ...data,
      deadline: data.deadline ? new Date(data.deadline) : undefined,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.assignmentService.remove(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/submit')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { fileUrl: { type: 'string' }, note: { type: 'string' } },
    },
  })
  async submit(
    @Param('id') id: string,
    @Body() data: { fileUrl: string; note?: string },
    @Request() req: any,
  ) {
    return this.assignmentService.submit(id, req.user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/submissions')
  async getSubmissions(@Param('id') id: string, @Request() req: any) {
    return this.assignmentService.getSubmissions(id, req.user.id);
  }
}

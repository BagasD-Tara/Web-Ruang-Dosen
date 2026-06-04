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
import { LabService } from './lab.service';

@ApiBearerAuth('JWT-auth')
@Controller('labs')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        instructions: { type: 'string' },
        courseId: { type: 'string' },
      },
      required: ['title', 'instructions', 'courseId'],
    },
  })
  async create(
    @Body()
    data: {
      title: string;
      instructions: string;
      courseId: string;
    },
    @Request() req: { user: { id: string } },
  ) {
    return this.labService.create(req.user.id, data);
  }

  @Get()
  async findAll(@Query('courseId') courseId?: string) {
    return this.labService.findAll(courseId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.labService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        instructions: { type: 'string' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      title?: string;
      instructions?: string;
    },
    @Request() req: { user: { id: string } },
  ) {
    return this.labService.update(id, req.user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.labService.remove(id, req.user.id);
  }
}

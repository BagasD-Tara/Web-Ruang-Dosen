import { Controller, Post, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from '@prisma/client';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  async create(
    @Body() data: { title: string; description: string; courseId: string }
  ): Promise<Assignment> {
    return this.assignmentService.create(data);
  }
}

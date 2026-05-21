import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }

  @Post()
  @ApiBody({ schema: { type: 'object', properties: { title: { type: 'string' }, courseId: { type: 'string' }, xpReward: { type: 'number' }, passingScore: { type: 'number' }, timeLimit: { type: 'number' } } } })
  create(@Body() data: {
    title: string;
    courseId: string;
    xpReward: number;
    passingScore: number;
    timeLimit?: number;
  }) {
    return this.quizService.create(data);
  }

  @Get()
  findAll(@Query('courseId') courseId?: string) {
    return this.quizService.findAll(courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ schema: { type: 'object', properties: { title: { type: 'string' }, timeLimit: { type: 'number' }, xpReward: { type: 'number' } } } })
  update(
    @Param('id') id: string,
    @Body() data: { title?: string; timeLimit?: number; xpReward?: number },
    @Request() req: any
  ) {
    return this.quizService.update(id, req.user.id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.quizService.remove(id, req.user.id);
  }
}

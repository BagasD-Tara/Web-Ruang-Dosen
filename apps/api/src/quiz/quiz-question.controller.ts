import { Body, Controller, Delete, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quiz-questions')
export class QuizQuestionController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quizId: { type: 'string' },
        question: { type: 'string' },
        optionA: { type: 'string' },
        optionB: { type: 'string' },
        optionC: { type: 'string' },
        optionD: { type: 'string' },
        correctAnswer: { type: 'string', enum: ['A', 'B', 'C', 'D'] },
      },
    },
  })
  create(
    @Body()
    data: {
      quizId: string;
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: string;
    },
    @Request() req: any,
  ) {
    return this.quizService.createQuestion(data, req.user);
  }

  @Put(':id')
  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        question: { type: 'string' },
        optionA: { type: 'string' },
        optionB: { type: 'string' },
        optionC: { type: 'string' },
        optionD: { type: 'string' },
        correctAnswer: { type: 'string', enum: ['A', 'B', 'C', 'D'] },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body()
    data: {
      question?: string;
      optionA?: string;
      optionB?: string;
      optionC?: string;
      optionD?: string;
      correctAnswer?: string;
    },
    @Request() req: any,
  ) {
    return this.quizService.updateQuestion(id, data, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.quizService.deleteQuestion(id, req.user);
  }
}

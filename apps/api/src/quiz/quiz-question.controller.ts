/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
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
        question: { type: 'string' },
        optionA: { type: 'string' },
        optionB: { type: 'string' },
        optionC: { type: 'string' },
        optionD: { type: 'string' },
        correctAnswer: { type: 'string', enum: ['A', 'B', 'C', 'D'] },
        quizId: { type: 'string' },
      },
      required: [
        'question',
        'optionA',
        'optionB',
        'optionC',
        'optionD',
        'correctAnswer',
        'quizId',
      ],
    },
  })
  create(
    @Body()
    data: {
      question: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
      correctAnswer: string;
      quizId: string;
    },
    @Request() req: { user: { id: string } },
  ) {
    return this.quizService.createQuestion(req.user.id, data);
  }

  @Put(':id')
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
    @Request() req: { user: { id: string } },
  ) {
    return this.quizService.updateQuestion(id, req.user.id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.quizService.deleteQuestion(id, req.user.id);
  }
}

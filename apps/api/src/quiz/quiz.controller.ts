import { Controller, Post, Body } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async create(
    @Body() data: { title: string; courseId: string; xpReward: number; minScore: number }
  ) {
    return this.quizService.create(data);
  }
}

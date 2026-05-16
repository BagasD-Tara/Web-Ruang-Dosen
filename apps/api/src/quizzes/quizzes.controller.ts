import { Controller, Post, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from '@prisma/client';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  async create(
    @Body()
    body: {
      title: string;
      courseId: string;
      xpReward: number;
      minScore: number;
    },
  ): Promise<Quiz> {
    return this.quizzesService.create(
      body.title,
      body.courseId,
      body.xpReward,
      body.minScore,
    );
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { QuizModule } from './quiz/quiz.module';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [AuthModule, QuizModule, CourseModule, AssignmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


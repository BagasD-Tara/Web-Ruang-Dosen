import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, PrismaService]
})
export class AssignmentModule {}

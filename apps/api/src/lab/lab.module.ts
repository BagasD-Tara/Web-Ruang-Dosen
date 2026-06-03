import { Module } from '@nestjs/common';
import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LabController],
  providers: [LabService, PrismaService],
})
export class LabModule {}

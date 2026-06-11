import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(role?: Role) {
    return this.prisma.user.findMany({
      where: role ? { role } : undefined,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        xp: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateRole(id: string, role: Role) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getStatistics() {
    const [
      totalUsers,
      totalStudents,
      totalLecturers,
      totalAdmins,
      totalCourses,
      totalQuizzes,
      totalAssignments,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'STUDENT' } }),
      this.prisma.user.count({ where: { role: 'LECTURER' } }),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.course.count(),
      this.prisma.quiz.count(),
      this.prisma.assignment.count(),
    ]);

    return {
      totalUsers,
      totalStudents,
      totalLecturers,
      totalAdmins,
      totalCourses,
      totalQuizzes,
      totalAssignments,
    };
  }
}

import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // === REGISTER: Mendaftarkan user baru ===
  async register(name: string, email: string, password: string, role: 'STUDENT' | 'LECTURER' | 'ADMIN') {
    // Cek apakah email sudah terdaftar
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }

    // Hash password agar tidak tersimpan mentah di database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru ke database
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Kembalikan data user tanpa password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // === LOGIN: Verifikasi user dan berikan JWT Token ===
  async login(email: string, password: string) {
    // Cari user berdasarkan email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email tidak ditemukan');
    }

    // Cocokkan password yang diketik dengan hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password salah');
    }

    // Buat JWT Token berisi ID dan Role user
    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  // === PROFILE: Get User Profile ===
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        role: true,
        xp: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // === PROFILE: Update User Profile ===
  async updateProfile(userId: string, data: { name?: string; password?: string }) {
    const updateData: any = {};
    if (data.name) {
      updateData.name = data.name;
    }
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}

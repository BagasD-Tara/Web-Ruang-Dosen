import { Controller, Post, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/register — Mendaftarkan akun baru
  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string; role: 'STUDENT' | 'LECTURER' | 'ADMIN' },
  ) {
    return this.authService.register(body.name, body.email, body.password, body.role);
  }

  // POST /auth/login — Masuk ke akun dan dapatkan JWT Token
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ) {
    return this.authService.login(body.email, body.password);
  }

  // GET /auth/profile — Dapatkan profil user yang sedang login
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.id);
  }

  // PUT /auth/profile — Update profil user
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req: any,
    @Body() body: { name?: string; password?: string; email?: string; role?: string },
  ) {
    // Validasi ketat: email dan role diabaikan jika dikirim
    return this.authService.updateProfile(req.user.id, {
      name: body.name,
      password: body.password,
    });
  }
}

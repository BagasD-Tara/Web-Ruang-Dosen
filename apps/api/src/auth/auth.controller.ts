import { Controller, Post, Body } from '@nestjs/common';
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
}

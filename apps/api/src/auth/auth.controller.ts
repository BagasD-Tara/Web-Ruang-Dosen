import { Controller, Post, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // POST /auth/register — Mendaftarkan akun baru
  @Post('register')
  @ApiBody({ schema: { type: 'object', properties: { name: { type: 'string' }, email: { type: 'string' }, password: { type: 'string' }, role: { type: 'string', enum: ['STUDENT', 'LECTURER', 'ADMIN'] } } } })
  async register(
    @Body() body: { name: string; email: string; password: string; role: 'STUDENT' | 'LECTURER' | 'ADMIN' },
  ) {
    return this.authService.register(body.name, body.email, body.password, body.role);
  }

  // POST /auth/login — Masuk ke akun dan dapatkan JWT Token
  @Post('login')
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } } })
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

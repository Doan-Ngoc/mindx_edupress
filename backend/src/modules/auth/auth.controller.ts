import { Controller, Post, Body, Query, Get, Res } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthLogInDto } from './dtos';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  logIn(
    @Body() authLogInDto: AuthLogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logIn(authLogInDto, res);
  }

  @Post('logout')
  logOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.logOut(res);
  }
}

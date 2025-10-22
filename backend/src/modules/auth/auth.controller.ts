import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthLogInDto } from './dtos';
import { Request, Response } from 'express';

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

  @Post('/refresh')
  async refreshToken(@Req() req: Request) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  logOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.logOut(res);
  }

  @Get('verify/access-token')
  verifyAccessToken(@Req() req: Request) {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException('Access token is missing');
    }
    return this.authService.verifyAccessToken(accessToken);
  }
}

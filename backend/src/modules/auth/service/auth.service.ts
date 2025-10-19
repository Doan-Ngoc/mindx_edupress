import {
  Injectable,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthLogInDto } from '../dtos/authLogIn.dto';
import { UserService } from '../../users/service/user.service';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from '../../../enum/user_status.enum';
import { signJwt, verifyJwt } from '../../../utils/jwt.util';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  comparePassword(receivedPassword: string, hashedPassword: string) {
    return bcrypt.compare(receivedPassword, hashedPassword);
  }

  async logIn(authLogInDto: AuthLogInDto, res: Response) {
    const { email, password } = authLogInDto;
    const user = await this.userService.getByEmail(email);
    const checkPassword = await this.comparePassword(
      password,
      user.hashedPassword,
    );
    if (user.status !== UserStatus.ACTIVE) {
      throw new BadRequestException('Your account is not active');
    }
    if (!checkPassword) throw new BadRequestException('Password incorrect');

    const accessToken = signJwt(
      {
        id: user.id,
        roleId: user.role.id,
        iat: Math.floor(Date.now() / 1000),
      },
      this.configService.getOrThrow('JWT_ACCESS_KEY') as string,
      {
        expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRE'),
      },
    );

    const refreshToken = signJwt(
      { id: user.id, iat: Math.floor(Date.now() / 1000) },
      this.configService.getOrThrow('JWT_REFRESH_KEY') as string,
      { expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRE') },
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'prod',
      // true in production (Only allow cookies to work on HTTPS), false in dev (Allow HTTP for local testing)
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      //Lax: Allows cookies to be sent across different ports in localhost. None: Allow cross-site requests but requires secure to be true.
    });

    return {
      accessToken: accessToken,
    };
  }

  //Log out
  async logOut(res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return { message: 'Logged out successfully' };
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { verifyJwt } from '../utils/jwt.util';
import { Reflector } from '@nestjs/core';
import { UserService } from '../modules/users/service/user.service';
import { UserStatus } from '../enum/user_status.enum';
import { Role } from '../enum/role.enum';
import { ROLE_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // Authentication check
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    const decode = verifyJwt(
      token,
      this.configService.getOrThrow('JWT_ACCESS_KEY') as string,
    );

    const user = await this.userService.getById(decode.id);

    //Add user to request
    request.user = user;

    //Only allow active users
    if (user.status !== UserStatus.ACTIVE) return false;

    //Bypass authorization check for admin
    if (user.role.name === Role.ADMIN) {
      return true;
    }
    // Authorization check
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRole) {
      return true;
    }

    if (user.role.name !== requiredRole) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

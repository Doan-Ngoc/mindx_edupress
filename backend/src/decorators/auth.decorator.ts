import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Role } from '../enum/role.enum';

export const ROLE_KEY = 'role';
export function Auth(role: Role): MethodDecorator & ClassDecorator {
  return applyDecorators(SetMetadata(ROLE_KEY, role), UseGuards(AuthGuard));
}

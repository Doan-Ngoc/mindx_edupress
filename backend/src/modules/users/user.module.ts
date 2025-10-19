import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { RoleRepository } from '../roles/repositories/role.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, RoleRepository, UserRepository],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './user.controller';
import { RoleRepository } from '../roles/repositories/role.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, RoleRepository, UserRepository],
  exports: [UserService],
})
export class UserModule {}

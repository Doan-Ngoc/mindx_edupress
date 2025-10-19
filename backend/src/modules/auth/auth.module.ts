import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../modules/users/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

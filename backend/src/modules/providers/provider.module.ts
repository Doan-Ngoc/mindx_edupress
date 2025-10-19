import { Module } from '@nestjs/common';
import { ProviderService } from './service/provider.service';
import { ProviderController } from './provider.controller';
import { ProviderRepository } from './repositories/provider.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [ UserModule],
  controllers: [ProviderController],
  providers: [ProviderService, ProviderRepository],
  exports: [ProviderService],
})
export class ProviderModule {}

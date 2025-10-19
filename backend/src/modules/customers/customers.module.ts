import { Module } from '@nestjs/common';
import { CustomersService } from './service/customers.service';
import { CustomersController } from './customers.controller';
import { CustomerRepository } from './repositories/customer.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  controllers: [CustomersController],
  providers: [CustomersService, CustomerRepository],
  exports: [CustomersService],
})
export class CustomersModule {}

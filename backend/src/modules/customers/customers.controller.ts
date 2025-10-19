import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './service/customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
}

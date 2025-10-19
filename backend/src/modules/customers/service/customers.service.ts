import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { Customer } from '../entities/customer.entity';
import { UserService } from '../../users/service/user.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { CustomerRepository } from '../repositories/customer.repository';
import { Role } from '../../../enum/role.enum';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly userService: UserService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { email, userName, password, profilePicture } = createCustomerDto;

      // First, create the user
      const createUserDto: CreateUserDto = {
        email,
        userName,
        password,
        role: Role.CUSTOMER,
      };

      const newUser = await this.userService.create(createUserDto);

      // Then, create the customer with the created user
      const newCustomer = queryRunner.manager.create(Customer, {
        user: newUser,
        profilePicture,
      });

      // Save and return the customer
      const savedCustomer = await queryRunner.manager.save(
        Customer,
        newCustomer,
      );

      await queryRunner.commitTransaction();
      return savedCustomer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all customers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}

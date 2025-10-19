import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateProviderDto } from '../dtos/create-provider.dto';
import { ProviderRepository } from '../repositories/provider.repository';
import { Provider } from '../entities/provider.entity';
import { UserService } from '../../users/service/user.service';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { Role } from '../../../enum/role.enum';

@Injectable()
export class ProviderService {
  constructor(
    private readonly providerRepository: ProviderRepository,
    private readonly userService: UserService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        email,
        userName,
        password,
        name,
        profilePicture,
        phone,
        description,
      } = createProviderDto;

      // First, create the user with PROVIDER role
      const createUserDto: CreateUserDto = {
        email,
        userName,
        password,
        role: Role.PROVIDER,
      };

      const newUser = await this.userService.create(createUserDto);

      // Then, create the provider with the created user
      const newProvider = queryRunner.manager.create(Provider, {
        user: newUser,
        name,
        profilePicture,
        phone,
        email,
        description,
      });

      // Save and return the provider
      const savedProvider = await queryRunner.manager.save(
        Provider,
        newProvider,
      );

      await queryRunner.commitTransaction();
      return savedProvider;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getByUserId(id: string): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { user: { id } },
      relations: ['user'],
    });

    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }

    return provider;
  }
}

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { Role } from '../../../enum/role.enum';
import { UserRepository } from '../repositories/user.repository';
import { RoleRepository } from '../../roles/repositories/role.repository';
import { AuthService } from '../../auth/service/auth.service';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, userName, password, role } = createUserDto;

    // Check if user with email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Find customer role
    const customerRole = await this.roleRepository.findOne({
      where: { name: role },
    });

    if (!customerRole) {
      throw new NotFoundException('Customer role not found');
    }

    // Hash password with salt
    const hashedPassword = this.authService.hashPassword(password);
    // const saltRounds = 12;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = this.userRepository.create({
      email,
      userName,
      hashedPassword,
      role: customerRole,
    });

    // Save to database
    return await this.userRepository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

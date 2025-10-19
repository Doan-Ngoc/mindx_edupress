import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}

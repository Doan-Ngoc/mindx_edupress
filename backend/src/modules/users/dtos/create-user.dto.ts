import { IsEmail, IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../../enum/role.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}

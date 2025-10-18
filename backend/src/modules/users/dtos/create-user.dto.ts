import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { UserStatus } from '../../../enum/user_status.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;
}

import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}

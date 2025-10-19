import { IsNotEmpty } from 'class-validator';

export class AuthLogInDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}

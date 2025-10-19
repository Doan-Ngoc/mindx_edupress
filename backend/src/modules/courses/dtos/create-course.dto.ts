import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}

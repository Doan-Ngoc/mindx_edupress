import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { UpdateCourseDto } from './dtos/update-course.dto';
import { CourseRepository } from './repositories/course.repository';
import { Auth } from '../../decorators/auth.decorator';
import { Role } from '../../enum/role.enum';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly courseRepository: CourseRepository,
  ) {}

  @Post()
  @Auth(Role.PROVIDER)
  create(@Body() createCourseDto: CreateCourseDto, @GetUser() user: User) {
    return this.courseService.create(createCourseDto, user.id);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}

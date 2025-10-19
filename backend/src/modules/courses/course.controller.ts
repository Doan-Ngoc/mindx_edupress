import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CreateCourseDto } from './dtos/create-course.dto';
import { CourseRepository } from './repositories/course.repository';
import { Auth } from '../../decorators/auth.decorator';
import { Role } from '../../enum/role.enum';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Course } from './entities/course.entity';

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

  @Post('/enroll/:courseId')
  @Auth(Role.CUSTOMER)
  enrollCourse(@Param('courseId') courseId: string, @GetUser() user: User) {
    return this.courseService.enrollCourse(courseId, user.id);
  }

  @Get('/created')
  @Auth(Role.PROVIDER)
  getCreatedCourses(@GetUser() user: User) {
    return this.courseService.getCreatedCourses(user.id);
  }

  @Get('/enrolled')
  @Auth(Role.CUSTOMER)
  getEnrolledCourses(@GetUser() user: User) {
    return this.courseService.getEnrolledCourses(user.id);
  }

  @Get()
  async getCourses(
    @Query('search') search: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number,
  ): Promise<Pagination<Course>> {
    limit = limit > 10 ? 10 : limit;
    const options: IPaginationOptions = {
      page,
      limit,
      route: '/courses',
    };
    return this.courseService.getCourses(options, search);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.courseService.getById(id);
  }
}

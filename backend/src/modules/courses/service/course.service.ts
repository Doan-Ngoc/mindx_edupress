import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { UpdateCourseDto } from '../dtos/update-course.dto';
import { Course } from '../entities/course.entity';
import { CourseStatus } from '../../../enum/course_status.enum';
import { CourseRepository } from '../repositories/course.repository';
import { ProviderRepository } from '../../providers/repositories/provider.repository';
import { ProviderService } from '../../providers/service/provider.service';
@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly providerService: ProviderService,
  ) {}

  async create(
    createCourseDto: CreateCourseDto,
    userId: string,
  ): Promise<Course> {
    const { title, price, description } = createCourseDto;

    const provider = await this.providerService.getByUserId(userId);

    if (!provider) {
      throw new NotFoundException('Provider not found');
    }

    // Check for existing course with the same title
    const existingCourse = await this.courseRepository.findOne({
      where: { title },
    });

    if (existingCourse) {
      throw new ConflictException('Course with this title already exists');
    }

    // Create new course
    const newCourse = this.courseRepository.create({
      title,
      price,
      description,
      status: CourseStatus.ACTIVE,
      createdBy: provider,
    });

    // Save and return the course
    return await this.courseRepository.save(newCourse);
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}

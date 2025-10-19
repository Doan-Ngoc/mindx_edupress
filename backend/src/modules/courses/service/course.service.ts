import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { Course } from '../entities/course.entity';
import { CourseStatus } from '../../../enum/course_status.enum';
import { CourseRepository } from '../repositories/course.repository';
import { ProviderService } from '../../providers/service/provider.service';
import { CustomersService } from '../../customers/service/customers.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly providerService: ProviderService,
    private readonly customerService: CustomersService,
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

  async enrollCourse(courseId: string, userId: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
      relations: ['customers'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const customer = await this.customerService.getByUserId(userId);

    // Check if the customer is already enrolled
    const isEnrolled = course.customers.some(
      (enrolledCustomer) => enrolledCustomer.id === customer.id,
    );

    if (isEnrolled) {
      throw new ConflictException(
        'Customer is already enrolled in this course',
      );
    }

    // Enroll the customer
    course.customers.push(customer);
    await this.courseRepository.save(course);
    return course;
  }

  async getById(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id },
      relations: ['createdBy'],
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async getCreatedCourses(userId: string): Promise<Course[]> {
    const courses = await this.courseRepository.find({
      where: { createdBy: { user: { id: userId } } },
    });
    return courses;
  }

  async getEnrolledCourses(userId: string): Promise<Course[]> {
    const courses = await this.courseRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.createdBy', 'provider')
      .leftJoin('course.customers', 'customer')
      .leftJoin('customer.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return courses;
  }

  async getCourses(
    options: IPaginationOptions,
    search?: string,
  ): Promise<Pagination<Course>> {
    const queryBuilder = this.courseRepository
      .createQueryBuilder('course')
      .leftJoin('course.createdBy', 'provider');

    if (search) {
      queryBuilder.where(
        'LOWER(course.title) LIKE :search OR LOWER(provider.name) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    queryBuilder.orderBy('course.createdAt', 'DESC');

    return paginate<Course>(queryBuilder, options);
  }
}

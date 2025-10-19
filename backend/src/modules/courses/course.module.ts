import { Module } from '@nestjs/common';
import { CourseService } from './service/course.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './repositories/course.repository';
import { ProviderModule } from '../providers/provider.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [ProviderModule, UserModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CourseModule {}

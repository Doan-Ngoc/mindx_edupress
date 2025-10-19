import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '../../../database/base.entity';
import { CourseStatus } from '../../../enum/course_status.enum';
import { Customer } from '../../customers/entities/customer.entity';
import { Provider } from '../../providers/entities/provider.entity';

@Entity({ name: 'courses' })
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'created_by' })
  createdBy: Provider;

  @Column({ name: 'title', type: 'varchar', length: 255, unique: true })
  title: string;

  @Column({ name: 'price', type: 'numeric' })
  price: number;

  @Column({ name: 'thumbnail', type: 'text', nullable: true })
  thumbnail: string;

  @Column({ name: 'description', nullable: true, type: 'text' })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: CourseStatus,
    default: CourseStatus.ACTIVE,
  })
  status: CourseStatus;

  @ManyToMany(() => Customer, (customer) => customer.courses)
  @JoinTable({
    name: 'course_customers',
    joinColumn: { name: 'course_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'customer_id', referencedColumnName: 'id' },
  })
  customers: Customer[];
}

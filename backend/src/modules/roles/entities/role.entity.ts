import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { BaseEntity } from '../../../database/base.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', unique: true })
  name: string;
}

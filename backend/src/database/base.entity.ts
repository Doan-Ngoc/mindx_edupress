import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { plainToInstance } from 'class-transformer';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  static plainToClass<T>(this: new (...arg: any[]) => T, obj: T): T {
    return plainToInstance(this, obj);
  }

  static plainToClassArray<T>(this: new (...arg: any[]) => T, obj: T[]): T[] {
    return plainToInstance(this, obj);
  }
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Course } from './Course';

export enum Type {
  PROGRAMMING = 'Programming Language',
  SOFTSKILL = 'Softskill',
  FRAMEWORK = 'Framework',
  LIBRARY = 'Library',
  DEVOPS = 'DevOps',
  TESTING = 'Testing',
  SECURITY = 'Security',
  VERSIONING = 'Version Control',
  PLATFORMS = 'Platforms',
  OTHER = 'Other',
}

@Entity()
export class CourseCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  @IsNotEmpty()
  title: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.PROGRAMMING,
  })
  @IsNotEmpty()
  type: Type;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @OneToMany(type => Course, course => course.courseCategory)
  course: Course[];
}

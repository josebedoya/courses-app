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

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 15,
  })
  @IsNotEmpty()
  title: string;

  @Column({
    length: 2,
    unique: true,
  })
  @IsNotEmpty()
  code: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations

  @OneToMany(type => Course, course => course.language)
  course: Course;
}

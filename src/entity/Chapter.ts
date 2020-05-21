import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Course } from './Course';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @IsNotEmpty()
  title: string;

  @Column({
    type: 'time'
  })
  duration: string;

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

  @ManyToOne(type => Course, course => course.chapters)
  course: Course;

}

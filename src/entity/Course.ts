import { CourseTag } from './CourseTag';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNotEmpty, IsFQDN } from 'class-validator';

import { Chapter } from './Chapter';
import { CourseCategory } from './CourseCategory';
import { Language } from './Language';
import { User } from './User';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  @IsNotEmpty()
  title: string;

  @Column()
  @IsFQDN()
  link: string;

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

  @OneToMany(type => Chapter, chapter => chapter.course)
  chapters: Chapter[];

  @ManyToOne(type => CourseCategory, courseCategory => courseCategory.course)
  courseCategory: CourseCategory;

  @ManyToOne(type => Language, language => language.course)
  language: Language;

  @ManyToMany(type => CourseTag)
  @JoinTable()
  courseTag: CourseTag[];

  @ManyToMany(type => User)
  @JoinTable()
  user: User[];
}

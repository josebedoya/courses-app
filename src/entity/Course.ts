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
  JoinColumn,
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

  //

  @Column()
  courseCategoryId: number;

  @Column()
  languageId: number;

  // Relations

  @OneToMany(type => Chapter, chapter => chapter.course)
  chapters: Chapter[];

  @ManyToOne(type => CourseCategory, courseCategory => courseCategory.course)
  @JoinColumn({ name: 'courseCategoryId' })
  courseCategory: CourseCategory;

  @ManyToOne(type => Language, language => language.course)
  @JoinColumn({ name: 'languageId' })
  language: Language;

  @ManyToMany(type => CourseTag)
  @JoinTable()
  courseTag: CourseTag[];

  @ManyToMany(type => User)
  @JoinTable()
  user: User[];
}

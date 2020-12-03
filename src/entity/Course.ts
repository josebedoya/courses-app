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
  RelationId,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

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

  //

  @ManyToOne(type => CourseCategory, courseCategory => courseCategory.course)
  courseCategory: CourseCategory;
  @RelationId((course: Course) => course.courseCategory)
  courseCategoryId: number;

  @ManyToOne(type => Language, language => language.course)
  language: Language;
  @RelationId((course: Course) => course.language)
  languageId: number;

  //

  @ManyToMany(type => CourseTag)
  @JoinTable()
  courseTag: CourseTag[];

  @ManyToMany(type => User)
  @JoinTable()
  user: User[];
}

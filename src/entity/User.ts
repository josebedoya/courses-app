import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { IsEmail, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';

import { Role } from './Role';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 30,
  })
  firstName: string;

  @Column({
    length: 30,
  })
  lastName: string;

  @Column({
    length: 100,
  })
  @IsEmail()
  email: string;

  @Column({
    length: 80,
  })
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  password: string;

  @Column({
    default: 1,
  })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => Role, role => role.users)
  role: Role;

  @BeforeInsert()
  @BeforeUpdate()
  async generatePasswordHash(): Promise<void> {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}

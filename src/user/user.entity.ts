import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Project } from 'src/project/project.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  user_name: string;

  @Column('text')
  email: string;

  @Column()
  password: string;

  @Column()
  user_location: string;

  @Column()
  user_github: string;

  @Column()
  user_twitter: string;

  @Column()
  user_linkedin: string;

  @Column()
  user_stack: string;

  @Column()
  user_learning: string;

  @Column()
  user_interested: string;

  @Column()
  user_involved: string;

  @OneToMany(() => Project, project => project.user)
  project: Promise<Project[]>
}
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

  @Column({ nullable: true })
  user_location: string;

  @Column({ nullable: true })
  user_github: string;

  @Column({ nullable: true })
  user_twitter: string;

  @Column({ nullable: true })
  user_linkedin: string;

  @Column({ nullable: true })
  user_stack: string;

  @Column({ nullable: true })
  user_learning: string;

  @Column({ nullable: true })
  user_interested: string;

  @Column({ nullable: true })
  user_involved: string;

  @OneToMany(() => Project, project => project.user)
  project: Promise<Project[]>
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

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
  // todo Make false for production
  @Column({ default: true})
  confirmed: boolean;

  // @OneToMany(() => Project, project => project.user)
  // project: Promise<Project[]>
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity('users')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  // todo Make false for production
  @Column({ default: true})
  confirmed: boolean;

  // @OneToMany(() => Project, project => project.user)
  // project: Promise<Project[]>
}
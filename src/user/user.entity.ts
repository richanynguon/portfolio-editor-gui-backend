import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { Project } from '../project/project.entity';
import { ObjectType, Field } from 'type-graphql';
import { Profile } from '../profile/profile.entity';


@Entity('users')
@ObjectType()
export class User {
 
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Field()
  @Column('text')
  user_name: string;

  @Field()
  @Column('text')
  email: string;
  
  @Field()
  @Column()
  password: string;
  
  @OneToMany(() => Project, project => project.user)
  project: Promise<Project[]>

  @OneToOne(() => Profile, profile => profile.user)
  profile: Promise<Profile>
}
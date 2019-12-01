import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Project } from '../project/project.entity';
import { ObjectType, Field } from 'type-graphql';


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
  token: string;
  
  @Field()
  @Column('text')
  email: string;
  
  @Field()
  @Column()
  password: string;
  
  @Field()
  @Column({ default: '' })
  user_location: string;
  
  @Field()
  @Column({ default: '' })
  user_github: string;
  
  @Field()
  @Column({ default: '' })
  user_twitter: string;
  
  @Field()
  @Column({ default: '' })
  user_linkedin: string;
  
  @Field()
  @Column({ default: '' })
  user_stack: string;
  
  @Field()
  @Column({ default: '' })
  user_learning: string;
  
  @Field()
  @Column({ default: '' })
  user_interested: string;
  
  @Field()
  @Column({ default: '' })
  user_involved: string;

  @OneToMany(() => Project, project => project.user)
  project: Promise<Project[]>
}
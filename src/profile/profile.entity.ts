import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm'
import { ObjectType, Field } from 'type-graphql';
import { User } from '../user/user.entity';

@Entity('profile')
@ObjectType()
export class Profile {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: '' })
  bio: string;

  @Field()
  @Column({ default: '' })
  location: string;

  @Field()
  @Column({ default: '' })
  github: string;

  @Field()
  @Column({ default: '' })
  twitter: string;

  @Field()
  @Column({ default: '' })
  linkedin: string;

  @Field()
  @Column({ default: '' })
  stack: string;

  @Field()
  @Column({ default: '' })
  learning: string;

  @Field()
  @Column({ default: '' })
  interested: string;

  @Field()
  @Column({ default: '' })
  involved: string;

  @Field()
  @Column()
  userId: string;

  @OneToOne(() => User, user => user.profile)
  user: Promise<User>
}
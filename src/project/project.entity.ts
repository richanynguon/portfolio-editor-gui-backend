import { ObjectType, Field } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/user/user.entity";
import { ProjectVote } from "./projectVotes.entity";

@ObjectType()
@Entity('project')
export class Project {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;


  @Field()
  @Column('text')
  title: string;

  @Field()
  @Column()
  project_focus: string;

  @Field()
  @Column()
  project_github: string;

  @Field()
  @Column()
  project_stack: string;

  @Field()
  @Column()
  project_photo: string;

  @Field()
  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.project)
  user: Promise<User>;
  

  @Field(() => [ProjectVote])
  @OneToMany(() => ProjectVote, projectVote => projectVote.project)
  projectVote: Promise<[ProjectVote]>;

}
import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Project } from './project.entity';

@ObjectType()
@Entity()
export class ProjectVote {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  option: string;

  @Field()
  @Column('integer')
  votes: number;

  @Field()
  @Column()
  projectId: number;

  @ManyToOne(() => Project, project => project.projectVote, { onDelete: "CASCADE" })
  project: Promise<Project>;

}
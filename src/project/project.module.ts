import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectVoteRepository } from './projectVotes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository, ProjectVoteRepository,
    ]),
  ],
  providers: [ ProjectService, ProjectResolver]
})
export class ProjectModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { ProjectVoteRepository } from './projectVotes.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository, ProjectVoteRepository, UserRepository
    ]),
  ],
  providers: [ ProjectService, ProjectResolver]
})
export class ProjectModule { }

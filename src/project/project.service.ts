import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectVoteRepository } from './projectVotes.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepo: ProjectRepository,

    @InjectRepository(ProjectVoteRepository)
    private readonly projectVoteRepo: ProjectVoteRepository,
  ) { }
}

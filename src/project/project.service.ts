import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectVoteRepository } from './projectVotes.repository';
import { CreateProjectArgs } from './args/createProjectArgs.args';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectRepository)
    private readonly projectRepo: ProjectRepository,

    @InjectRepository(ProjectVoteRepository)
    private readonly projectVoteRepo: ProjectVoteRepository,
  ) { }

  async createProject(
    createProjectArgs: CreateProjectArgs,
    userId: string,
  ): Promise<Boolean> {
    const {
      project_focus,
      project_github,
      project_photo,
      project_stack,
      title
    } = createProjectArgs;
    const newProject = await this.projectRepo.insert({
      project_focus,
      project_github,
      project_photo,
      project_stack,
      title,
      userId,
    })
    await this.projectVoteRepo.insert({
      option: 'upvote',
      votes: 0,
      projectId: newProject.raw[0].id
    })
    return true;
  }

  async getProject(){}

  async getAllProjects(){}


}

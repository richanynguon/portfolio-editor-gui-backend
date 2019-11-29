import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectVoteRepository } from './projectVotes.repository';
import { CreateProjectArgs } from './args/createProjectArgs.args';
import { Project } from './project.entity';
import { EditProjectArgs } from './args/editProjectArgs';
import { errorMessage } from '../user/shared/errorMessage';
import { successMessage } from '../user/shared/successMessage';
import { ErrorResponse } from '../user/shared/errorResponse';
import { SuccessResponse } from '../user/shared/successResponse';

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

  async getProject(
    id: number,
  ): Promise<Project> {
    return await this.projectRepo.findOne({
      where: { id },
      relations: ['projectVotes']
    })
  }

  async getAllProjects(
    take,
    skip
  ): Promise<Project[]> {
    return this.projectRepo
      .createQueryBuilder('project')
      .innerJoinAndSelect('project.projectVote', 'votes')
      .orderBy('project.id', 'ASC')
      .take(take)
      .skip(skip)
      .getMany();
  }


  async editProject(
    projectId: number,
    editProject: EditProjectArgs
  ): Promise<ErrorResponse[] | SuccessResponse[]> {

    const updatedProject = 
      await this.projectRepo.update(projectId, editProject)
    if(!updatedProject){
      return errorMessage('update_project', 'Sorry unable to update project')
    }
    return successMessage('update_project', `Successfully updated project`)
  
  }

  // async upVoteProject() { }

}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './project.repository';
import { ProjectVoteRepository } from './projectVotes.repository';
import { CreateProjectArgs } from './args/createProjectArgs.args';
import { Project } from './project.entity';
import { EditProjectArgs } from './args/editProjectArgs';

import { MyContext } from '../types/myContext';
import { redis } from '../redis';
import { VOTE_PREFIX } from '../constants';
import { ActionResponse } from '../shared/actionResponse';
import { actionMessage } from '../shared/actionMessage';

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
   await  console.log(createProjectArgs, userId)
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
      where: { id }
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
  ): Promise<ActionResponse[]> {

    const updatedProject =
      await this.projectRepo.update({id:projectId}, editProject)
    if (!updatedProject) {
      return actionMessage('update_project', 'Sorry unable to update project')
    }
    return actionMessage('update_project', `Successfully updated project`)

  }

  async upVoteProject(
    ctx: MyContext,
    projectVoteId: number
  ): Promise<Boolean> {

    const projectVote =
      await this.projectVoteRepo.findOne({
        where: { id: projectVoteId }
      })

    const ip =
      ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;

    if (ip) {
      const hasIp = await redis.sismember(
        `${VOTE_PREFIX}${projectVote.projectId}`, ip
      );
      if (hasIp) {
        return false
      }
    }

    await this.projectVoteRepo.update(
      { id: projectVoteId },
      { votes: projectVote.votes + 1 }
    )

    await redis.sadd(`${VOTE_PREFIX}${projectVote.projectId}`, ip);

    return true;
  }

  async deleteProject(
    ctx: MyContext,
    id: number
  ): Promise<Boolean>{
    try{
      await this.projectRepo.delete({id})
      const ip =
      ctx.req.header('x-forwarded-for') || ctx.req.connection.remoteAddress;
      await redis.srem(`${VOTE_PREFIX}${id}`, ip);
    }catch(err){
      return false;
    }
    return true;
  }

}

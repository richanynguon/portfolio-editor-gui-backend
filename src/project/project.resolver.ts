import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,

} from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { GetUserId } from './getUserId.decorator';
import { CreateProjectArgs } from './args/createProjectArgs.args';
import { AllProjectsArgs } from './args/allProjectsArgs.args';
import { EditProjectArgs } from './args/editProjectArgs';

import { MyContext } from '../types/myContext';
import { ActionResponse } from '../shared/actionResponse';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) { }

  @Mutation(() => Boolean)
  async createProject(
    @GetUserId() userId: string,
    @Args() createProjectArgs: CreateProjectArgs,
  ): Promise<Boolean> {
  
    return this.projectService.createProject(createProjectArgs, userId)
  }

  @Query(() => Project)
  async getProject(
    @Args('id') id: number
  ): Promise<Project> {
    return this.projectService.getProject(id)
  }

  @Query(() => [Project])
  async getAllProjects(
    @Args() { take, skip }: AllProjectsArgs,
  ): Promise<Project[]> {
    return this.projectService.getAllProjects(take, skip);
  }

  @Mutation(() => [ActionResponse])
  async editProject(
    @Args() editProjectArgs: EditProjectArgs,
    @Args('id') projectId: number
  ): Promise<ActionResponse[]> {
    return this.projectService.editProject(projectId, editProjectArgs)
  }

  @Mutation(() => Boolean)
  async upVoteProject(
    @Context() ctx: MyContext,
    @Args('id') projectVoteId: number
  ): Promise<Boolean> {
    return this.projectService.upVoteProject(ctx, projectVoteId)
  }

  @Mutation(() => Boolean)
  async deleteProject(
    @Context() ctx: MyContext,
    @Args('id') id: number
  ): Promise<Boolean> {
    return this.projectService.deleteProject(ctx, id)
  }

}

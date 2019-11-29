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
import { ErrorResponse } from '../user/shared/errorResponse';
import { SuccessResponse } from '../user/shared/successResponse';
import { MyContext } from '../types/myContext';



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

  @Mutation(() => [ErrorResponse] || [SuccessResponse])
  async editProject(
    @Args() editProjectArgs: EditProjectArgs,
    @Args('projectId') projectId: number
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    return this.projectService.editProject(projectId, editProjectArgs)
  }

  @Mutation(() => Boolean)
  async upVoteProject(
    @Context() ctx: MyContext,
    @Args('projectVoteId') projectVoteId: number
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

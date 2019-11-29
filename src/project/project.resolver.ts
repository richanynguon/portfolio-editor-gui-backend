import {
  Resolver,
  Mutation,
  Args
} from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { GetUserId } from './getUserId.decorator';
import { CreateProjectArgs } from './args/createProjectArgs.args';


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

}

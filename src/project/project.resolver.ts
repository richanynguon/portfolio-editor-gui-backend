import { Resolver } from '@nestjs/graphql';
import { ProjectService } from './project.service';

@Resolver('Project')
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService){}

}

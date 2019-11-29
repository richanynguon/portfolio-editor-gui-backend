import { EntityRepository, Repository} from "typeorm";
import { ProjectVote } from "./projectVotes.entity";

@EntityRepository(ProjectVote)
export class ProjectVoteRepository extends Repository<ProjectVote>{

}
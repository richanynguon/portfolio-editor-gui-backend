import { ArgsType, Field} from "type-graphql";

@ArgsType()
export class CreateProjectArgs{
  @Field()
  title: string;
  
  @Field({ nullable: true })
  project_focus: string;

  @Field()
  project_github: string;

  @Field()
  project_stack: string;

  @Field({ nullable: true })
  project_photo: string;



  
  
}

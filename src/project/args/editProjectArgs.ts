import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class EditProjectArgs {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  project_focus: string;

  @Field({ nullable: true })
  project_github: string;

  @Field({ nullable: true })
  project_stack: string;

  @Field({ nullable: true })
  project_photo: string;

  

}

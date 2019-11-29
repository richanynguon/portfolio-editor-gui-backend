import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class EditProjectArgs {
  @Field()
  title: string;

  @Field()
  project_focus: string;

  @Field()
  project_github: string;

  @Field()
  project_stack: string;

  @Field()
  project_photo: string;

}

import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class EditProfileArgs {

  @Field({ nullable: true })
  bio: string;
  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  github: string;

  @Field({ nullable: true })
  twitter: string;

  @Field({ nullable: true })
  linkedin: string;

  @Field({ nullable: true })
  stack: string;

  @Field({ nullable: true })
  learning: string;

  @Field({ nullable: true })
  interested: string;

  @Field({ nullable: true })
  involved: string;


}

import { InputType, Field } from "type-graphql";
import { User } from "../user.entity";

@InputType()
export class ContactInput implements Partial<User>{

  @Field()
  email: string;

  @Field({ nullable: true })
  message: string;

  @Field({ nullable: true })
  name: string;
}
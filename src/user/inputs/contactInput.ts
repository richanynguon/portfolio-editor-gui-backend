import { InputType, Field } from "type-graphql";
import { User } from "../user.entity";

@InputType()
export class ContactInput implements Partial<User>{

  @Field()
  email: string;

  @Field()
  message: string;
}
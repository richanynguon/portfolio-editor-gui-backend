import {
  Resolver,
  Mutation,
  Context,
  Args,
  Query
} from '@nestjs/graphql';
import { SignUpInput } from './inputs/signupInput';
import { UserService } from './user.service';
import { LoginInput } from './inputs/loginInput';
import { MyContext } from '../types/myContext';
import { ContactInput } from './inputs/contactInput';
import { ProfileInput } from './inputs/profileInput';
import { User } from './user.entity';
import { ActionResponse } from '../shared/actionResponse';



@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }



  @Query(() => User || [ActionResponse] )
  async getUser(
    @Args('user_name') user_name: string
    ): Promise<User | ActionResponse[]> {
    return this.userService.getUser(user_name);
  }

  @Mutation(() => [ActionResponse])
  async signup(
    @Args('signupInput') signupInput: SignUpInput
  ): Promise<ActionResponse[]> {
    return this.userService.signup(signupInput)
  }

  @Mutation(() => [ActionResponse])
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext
  ): Promise<ActionResponse[]> {
    return this.userService.login(loginInput, ctx.req)
  }


  @Mutation(() => [ActionResponse])
  async logout(
    @Context() ctx: MyContext,
  ) {
    return this.userService.logout(ctx)
  }

  @Mutation(() => [ActionResponse])
  async sendBalooEmail(
    @Args('contactIput') { email, message, name }: ContactInput
  ): Promise<ActionResponse[]> {
    return this.userService.sendBalooEmail(email, message, name);
  }

  @Mutation(() => [ActionResponse])
  async editProfile(
    @Args('profileArgs') profileInput: ProfileInput
  ): Promise<ActionResponse[]> {
    return this.userService.editProfile(profileInput);
  }


}

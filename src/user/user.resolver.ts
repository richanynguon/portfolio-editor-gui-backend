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
import { User } from './user.entity';
import { ActionResponse } from '../shared/actionResponse';
import { LoginResponse } from './responses/loginResponse';



@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }



  @Query(() => User || [ActionResponse] )
  async getUserProfile(
    @Args('user_name') user_name: string
    ): Promise<User | ActionResponse[]> {
    return this.userService.getUserProfile(user_name);
  }

  @Mutation(() => [ActionResponse])
  async signup(
    @Args('signupInput') signupInput: SignUpInput
  ): Promise<ActionResponse[]> {
    return this.userService.signup(signupInput)
  }

  @Mutation(() => [ActionResponse] || [LoginResponse])
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext
  ): Promise<ActionResponse[] | LoginResponse[]> {
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




}

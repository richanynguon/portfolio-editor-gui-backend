import {
  Resolver,
  Mutation,
  Context,
  Args,
  Query
} from '@nestjs/graphql';
import { SignUpInput } from './inputs/signupInput';
import { UserService } from './user.service';
import { ErrorResponse } from './shared/errorResponse';
import { SuccessResponse } from './shared/successResponse';
import { LoginInput } from './inputs/loginInput';
import { MyContext } from '../types/myContext';
import { ContactInput } from './inputs/contactInput';
import { ProfileInput } from './inputs/profileInput';
import { User } from './user.entity';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }



  @Query(() => User || [ErrorResponse] )
  async getUser(
    @Args('user_name') user_name: string
    ): Promise<User | ErrorResponse[]> {
    return this.userService.getUser(user_name);
  }

  @Mutation(() => [ErrorResponse] || [SuccessResponse])
  async signup(
    @Args('signupInput') signupInput: SignUpInput
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    return this.userService.signup(signupInput)
  }

  @Mutation(() => [ErrorResponse] || [SuccessResponse])
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() ctx: MyContext
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    return this.userService.login(loginInput, ctx.req)
  }


  @Mutation(() => [ErrorResponse] || [SuccessResponse])
  async logout(
    @Context() ctx: MyContext,
  ) {
    return this.userService.logout(ctx)
  }

  @Mutation(() => [ErrorResponse] || [SuccessResponse])
  async sendBalooEmail(
    @Args('contactIput') { email, message, name }: ContactInput
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    return this.userService.sendBalooEmail(email, message, name);
  }

  @Mutation(() => [ErrorResponse] || [SuccessResponse])
  async editProfile(
    @Args('profileArgs') profileInput: ProfileInput
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    return this.userService.editProfile(profileInput);
  }


}

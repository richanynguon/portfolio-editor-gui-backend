import {
  Resolver, 
  Mutation, 
  Context, 
  Args,
} from '@nestjs/graphql';
import { SignUpInput } from './inputs/signupInput';
import { UserService } from './user.service';
import { ErrorResponse } from './shared/errorResponse';
import { SuccessResponse } from './shared/successResponse';
import { LoginInput } from './inputs/loginInput';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }

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
  ): Promise<ErrorResponse[] | null> {
    return this.userService.login(loginInput, ctx.req)
  }

}

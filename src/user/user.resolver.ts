import {
  Resolver, Mutation,
} from '@nestjs/graphql';
import { Arg } from 'type-graphql';
import { SignUpInput } from './inputs/signupInput';
import { UserService } from './user.service';
import { ErrorResponse } from './shared/errorResponse';
import { SuccessResponse } from './shared/successResponse';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }

  @Mutation()
  async signup(
    @Arg('signupInput') signupInput: SignUpInput
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    return this.userService.signup(signupInput)
  }

}

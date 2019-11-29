import {
  Resolver, Mutation,
} from '@nestjs/graphql';
import { Arg } from 'type-graphql';
import { SignUpInput } from './inputs/signupInput';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService)

  @Mutation()
  async signup(@Arg('signupInput') signupInput: SignUpInput) {
    return this.userService.signup(signupInput)
  }

}

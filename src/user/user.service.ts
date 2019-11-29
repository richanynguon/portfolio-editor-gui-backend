import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpInput } from './inputs/signupInput';
import { errorMessage } from './shared/errorMessage';
import { successMessage } from './shared/successMessage';
import { ErrorResponse } from './shared/errorResponse';
import { SuccessResponse } from './shared/successResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository
  ) { }

  async signup(
    signupInput: SignUpInput
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } });
    if (userExist) {
      return errorMessage("signup", "Email has already been taken");
    }
    await this.userRepo.save({ ...signupInput })
    return successMessage(
      'signup',
      `Account with email: ${signupInput.email} has been created`
    );
  }
}

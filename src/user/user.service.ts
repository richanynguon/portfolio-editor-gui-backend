import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpInput } from './inputs/signupInput';
import { errorMessage } from './shared/errorMessage';
import { successMessage } from './shared/successMessage';
import { ErrorResponse } from './shared/errorResponse';
import { SuccessResponse } from './shared/successResponse';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { LoginInput } from './inputs/loginInput';

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

  async login(
    loginInput: LoginInput,
    req: Request
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email }
    })
    if (!user) {
      return errorMessage("login", "You have submitted an invalid email or password");
    }
    const checkedPassword = await bcrypt.compare(loginInput.password, user.password)
    if (!checkedPassword) {
      return errorMessage("login", "You have submitted an invalid email or password");
    }
    if(user.user_name !== 'creator'){
      return errorMessage("login", "Your account is not allowed to have access");
    }
    req.session.userId = user.id;

    return successMessage('login', `Welcome ${user.user_name}`);
  }
}

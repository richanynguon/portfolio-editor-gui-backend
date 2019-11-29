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
import { MyContext } from 'src/types/myContext';
import { sendEmail } from 'src/utils/sendEmail';
import { ProfileInput } from './inputs/profileInput';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository
  ) { }

  async getUser(user_name: string): Promise<User | ErrorResponse[]> {
    const user = await this.userRepo.findOne({ where: { user_name } });
    if(!user){
      return errorMessage('user', 'Unable to find the user you are looking for')
    }
    return user;
  }

  async signup(
    signupInput: SignUpInput
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } });
    if (userExist) {
      return errorMessage("signup", "Email has already been taken");
    }
    const newUser = await this.userRepo.save({ ...signupInput })
    return successMessage(
      'signup',
      `Account with email: ${signupInput.email} has been created with id: ${newUser.id}`
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
    if (user.user_name !== 'creator') {
      return errorMessage("login", "Your account is not allowed to have access");
    }
    req.session.userId = user.id;

    return successMessage('login', `${user.user_name}`);
  }

  async logout(cxt: MyContext): Promise<ErrorResponse[] | SuccessResponse[]> {
    await cxt.req.session.destroy(err => {
      console.log(err)
      return errorMessage("logout", "Sorry unable to logout");
    })
    await cxt.res.clearCookie("votingapp");
    return successMessage('logout', `Succesfully able to logout`);
  }

  async sendBalooEmail(
    email: string,
    message: string,
    name: string,
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    const emailList = `${email}, alina.nguon@gmail.com`
    if (!email) {
      return errorMessage("contact", "Unable to send your email");
    }
    await sendEmail(emailList, message, name)
    return successMessage('contact', `Please check your inbox`);
  }

  async editProfile(
    profileInput: ProfileInput,
  ): Promise<ErrorResponse[] | SuccessResponse[]> {
    const userExist = await this.userRepo.findOne({ where: { user_name: profileInput.user_name } });
    if (!userExist) {
      return errorMessage("profile", "The username you entered did not match");
    }
    if (!profileInput) {
      return errorMessage('profile', 'Please enter information to update')
    }
    await this.userRepo.update({ id: userExist.id }, { ...profileInput })
    return successMessage('profile', 'You succesfully updated your profile information')

  }
}

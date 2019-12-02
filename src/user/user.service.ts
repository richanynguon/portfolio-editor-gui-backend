import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpInput } from './inputs/signupInput';
import * as bcrypt from 'bcryptjs';
import { Request } from 'express';
import { LoginInput } from './inputs/loginInput';
import { MyContext } from 'src/types/myContext';
import { sendEmail } from 'src/utils/sendEmail';
import { User } from './user.entity';
import { ActionResponse } from '../shared/actionResponse';
import { actionMessage } from '../shared/actionMessage';
import { generateJWT } from '../utils/generateToken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository
  ) { }

  async getUserProfile(user_name: string): Promise<User | ActionResponse[]> {
    const user = await this.userRepo.findOne({ where: { user_name } });
    if (!user) {
      return actionMessage('user', 'Unable to find the user you are looking for')
    }
    return user;
  }

  async signup(
    signupInput: SignUpInput
  ): Promise<ActionResponse[]> {
    const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } });
    if (userExist) {
      return actionMessage("signup", "Email has already been taken");
    }
    const newUser = await this.userRepo.save({ ...signupInput })
    return actionMessage(
      'signup',
      `Account with email: ${signupInput.email} has been created with id: ${newUser.id}`
    );
  }

  async login(
    loginInput: LoginInput,
    req: Request
  ): Promise<ActionResponse[]> {
    const user = await this.userRepo.findOne({
      where: { email: loginInput.email }
    })
    if (!user) {
      return actionMessage("login", "You have submitted an invalid email or password");
    }
    const checkedPassword = await bcrypt.compare(loginInput.password, user.password)
    if (!checkedPassword) {
      return actionMessage("login", "You have submitted an invalid email or password");
    }
    if (user.user_name !== 'creator') {
      return actionMessage("login", "Your account is not allowed to have access");
    }
    req.session.userId = user.id;
    const token = await generateJWT(user)

    return actionMessage('login', `${user.user_name},${token}`);
  }

  async logout(cxt: MyContext): Promise<ActionResponse[]> {
    await cxt.req.session.destroy(err => {
      console.log(err)
      return actionMessage("logout", "Sorry unable to logout");
    })
    await cxt.res.clearCookie("votingapp");
    return actionMessage('logout', `Succesfully able to logout`);
  }

  async sendBalooEmail(
    email: string,
    message: string,
    name: string,
  ): Promise<ActionResponse[]> {
    const emailList = `${email}, alina.nguon@gmail.com`
    if (!email) {
      return actionMessage("contact", "Unable to send your email");
    }
    await sendEmail(emailList, message, name)
    return actionMessage('contact', `Please check your inbox`);
  }


}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpInput } from './inputs/signupInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository
  ) { }

  async signup(signupInput: SignUpInput){
    const userExist = await this.userRepo.findOne({ where: { email: signupInput.email } });
    if (userExist) {
      return errorMessage("email", "account already created");
    }
    const user = await this.userRepo.save({ ...signupInput })
    return null;
  }
}

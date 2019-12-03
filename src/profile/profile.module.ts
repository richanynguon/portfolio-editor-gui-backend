import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileRepository, UserRepository
    ]),
  ],
  providers: [ProfileService, ProfileResolver]
})
export class ProfileModule { }






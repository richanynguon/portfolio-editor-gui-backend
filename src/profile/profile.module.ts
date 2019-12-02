import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileRepository
    ]),
  ],
  providers: [ProfileService, ProfileResolver]
})
export class ProfileModule { }






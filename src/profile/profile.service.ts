import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionResponse } from '../shared/actionResponse';
import { actionMessage } from '../shared/actionMessage';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';
import { CreateProfileArgs } from './args/createProfileArgs.args';
import { EditProfileArgs } from './args/editProfileArgs.args';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly ProfileRepo: ProfileRepository,

  ) { }

  async createProfile(
    createProfileArgs: CreateProfileArgs,
    userId: string,
  ): Promise<ActionResponse[]> {
   const {
     github,
     interested,
     involved,
     learning,
     linkedin,
     location,
     stack,
     twitter, 
     bio
    } = createProfileArgs;
    const newProfile = await this.ProfileRepo.insert({
      github,
      interested,
      involved,
      learning,
      linkedin,
      location,
      stack,
      twitter,
       bio,
      userId,
    })

    if(!newProfile){
      return actionMessage('profile', 'Sorry unable to get user profile')
    }
    return actionMessage('profile', `${newProfile.raw[0].id}`)
  }

  async getProfile(
    id: number,
  ): Promise<Profile> {
    return await this.ProfileRepo.findOne({where: { id }})
  }


  async editProfile(
    userId: string,
    editProfile: EditProfileArgs
  ): Promise<ActionResponse[]> {

    const updatedProfile =
      await this.ProfileRepo.update({userId}, editProfile)
    if (!updatedProfile) {
      return actionMessage('update_Profile', 'Sorry unable to update Profile')
    }
    return actionMessage('update_Profile', `Successfully updated Profile`)

  }




}

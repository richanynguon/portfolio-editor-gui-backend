import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,

} from '@nestjs/graphql';

import { ActionResponse } from '../shared/actionResponse';
import { GetUserId } from '../project/getUserId.decorator';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { CreateProfileArgs } from './args/createProfileArgs.args';
import { EditProfileArgs } from './args/editProfileArgs.args';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../project/auth.guard';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly ProfileService: ProfileService) { }

  @Mutation(() => [ActionResponse])
  @UseGuards(AuthGuard)
  async createProfile(
    @GetUserId() userId: string,
    @Args() createProfileArgs: CreateProfileArgs,
  ): Promise<ActionResponse[]> {

    return this.ProfileService.createProfile(createProfileArgs, userId)
  }

  @Query(() => [Profile])
  async getAllProfiles(): Promise<Profile[]> {
    return this.ProfileService.getAllProfiles();
  }

  @Query(() => Profile)
  async getProfile(
    @Args('id') id: number,
  ): Promise<Profile> {
    return this.ProfileService.getProfile(id)
  }



  @Mutation(() => [ActionResponse])
  @UseGuards(AuthGuard)
  async editProfile(
    @Args() editProfileArgs: EditProfileArgs,
    @GetUserId() userId: string,
  ): Promise<ActionResponse[]> {
    return this.ProfileService.editProfile(userId, editProfileArgs)
  }




}

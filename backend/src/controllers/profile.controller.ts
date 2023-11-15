import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    Delete,
  } from '@nestjs/common';
  import { ProfileService } from '../services/profile.service';
  import {
    Prisma,
    Profile,
    Profile as ProfileModel /*, Post as PostModel */,
  } from '@prisma/client';
  
  @Controller()
  export class ProfileController {
    constructor(
      private readonly profileService: ProfileService,
    ) { }
  
    @Get('/profile/:user_id')
    async get(@Param('user_id') user_id: string) {
      const id = Number(user_id)
      return this.profileService.get({ user_id: id });
    }
  
    @Get('/profiles/:user_id')
    findMany(@Param('user_id') user_id: number) {
      return this.profileService.findMany({ user_id });
    }
  
    @Post('/profile/auth')
    create(
      @Body()
      data: Prisma.ProfileCreateInput,
    ): Promise<Profile> | null {
      return this.profileService.create(data);
    }
  
    @Patch('/profile/:user_id')
    update(
      @Param('user_id') user_id: string,
      @Body() updateLinkDto: Prisma.ProfileUpdateInput,
    ) {
      return this.profileService.update({
        where: { user_id: Number(user_id) },
        data: updateLinkDto,
      });
    }
  
    @Delete('/profile_delete/:user_id')
    delete(@Param('user_id') user_id: number) {
      return this.profileService.delete({ user_id });
    }
  }
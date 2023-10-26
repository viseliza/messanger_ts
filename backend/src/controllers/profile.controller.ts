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
    get(@Param('user_id') user_id: number) {
      return this.profileService.get({ user_id });
    }
  
    @Get('/profiles')
    findMany() {
      return this.profileService.findMany({});
    }
  
    @Post('/profile/auth')
    create(
      @Body()
      data: Prisma.ProfileCreateInput,
    ): Promise<Profile> | null {
      return this.profileService.create(data);
    }
  
    @Patch('/profile_update/:user_id')
    update(
      @Param('user_id') user_id: number,
      @Body() updateLinkDto: Prisma.ProfileUpdateInput,
    ) {
      return this.profileService.update({
        where: { user_id },
        data: updateLinkDto,
      });
    }
  
    @Delete('/profile_delete/:user_id')
    delete(@Param('user_id') user_id: number) {
      return this.profileService.delete({ user_id });
    }
  }
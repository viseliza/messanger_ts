import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Prisma, User, User as UserModel } from '@prisma/client';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get('/:novsu_login')
  get(@Param('novsu_login') novsu_login: string) {
    return this.userService.findOne({ novsu_login });
  }

  @Post('/auth')
  create(
    @Body()
    data: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.userService.create(data);
  }

  @Patch('/:novsu_login')
  update(
    @Param('novsu_login') novsu_login: string,
    @Body() updateLinkDto: Prisma.UserUpdateInput,
  ) {
    return this.userService.update({
      where: { novsu_login },
      data: updateLinkDto,
    });
  }

  @Delete('/:novsu_login')
  delete(@Param('novsu_login') novsu_login: string) {
    return this.userService.delete({ novsu_login });
  }
}

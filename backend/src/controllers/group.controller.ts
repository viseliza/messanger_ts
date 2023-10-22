import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { GroupService } from '../services/group.service';
/* import { GroupService } from '../services/group.service'; */
import {
  Prisma,
  Group,
  Group as GroupModel /*, Post as PostModel */,
} from '@prisma/client';

@Controller()
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
  ) { }

  @Get('/group/:name')
  get(@Param('name') name: string) {
    return this.groupService.get({ name });
  }

  @Get('/groups')
  findMany() {
    return this.groupService.findMany({});
  }

  @Post('/group/auth')
  create(
    @Body()
    data: Prisma.GroupCreateInput,
  ): Promise<Group> {
    return this.groupService.create(data);
  }

  @Patch('/group_update/:name')
  update(
    @Param('name') name: string,
    @Body() updateLinkDto: Prisma.GroupUpdateInput,
  ) {
    return this.groupService.update({
      where: { name },
      data: updateLinkDto,
    });
  }

  @Delete('/group_delete/:name')
  delete(@Param('name') name: string) {
    return this.groupService.delete({ name });
  }
}
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
  async get(@Param('name') name: string) {
    return this.groupService.get({ name });
  }

  @Get('/groupName/:id')
  async getName(@Param('id') id: string) {
    return (await this.groupService.get({ id: Number(id) })).name;
  }

  @Get('/groups')
  findMany() {
    return this.groupService.findMany({});
  }

  @Post('/group')
  async create(
    @Body()
    data: Prisma.GroupCreateInput,
  ): Promise<Group> {
    let group = await this.groupService.get({ name: data.name })

    if (!group) group = await this.groupService.create(data);

    return group;
  }

  @Post('/groups')
  async push(
    @Body()
    data: Prisma.GroupCreateManyInput[]
    ) {
    return await this.groupService.createMany(data)
  }

  @Patch('/group/:name')
  update(
    @Param('name') name: string,
    @Body() updateLinkDto: Prisma.GroupUpdateInput,
  ) {
    return this.groupService.update({
      where: { name },
      data: updateLinkDto,
    });
  }

  @Delete('/group/:name')
  delete(@Param('name') name: string) {
    return this.groupService.delete({ name });
  }
}
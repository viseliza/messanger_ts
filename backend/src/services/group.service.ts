import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Group, Prisma } from '@prisma/client';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) { }

  async get(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    const group: Group = await this.prisma.group.findUnique({ where });
    return group;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GroupWhereUniqueInput;
    where?: Prisma.GroupWhereInput;
    orderBy?: Prisma.GroupOrderByWithRelationInput;
  }): Promise<Group[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.group.findMany({ skip, take, cursor, where, orderBy });
  }

  async create(data: Prisma.GroupCreateInput): Promise<Group> {
    return this.prisma.group.create({
      data
    });
  }

  async update(params: {
    where: Prisma.GroupWhereUniqueInput;
    data: Prisma.GroupUpdateInput;
  }): Promise<Group> {
    const { data, where } = params;
    return this.prisma.group.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.GroupWhereUniqueInput): Promise<Group> {
    return this.prisma.group.delete({
      where,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Profile, Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) { }

  async get(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
    return await this.prisma.profile.findUnique({ where });
  }

  async findMany( data: Prisma.ProfileWhereInput ): Promise<Profile[]> {
    return await this.prisma.profile.findMany({ where: {
      user_id: Number(data.user_id)
    }, include: {
      rooms: true
    } });
  }

  async create(data: Prisma.ProfileCreateInput): Promise<Profile> {
    return this.prisma.profile.create({
      data
    });
  }

  async update(params: {
    where: Prisma.ProfileWhereUniqueInput;
    data: Prisma.ProfileUpdateInput;
  }): Promise<Profile> {
    const { data, where } = params;
    return this.prisma.profile.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.ProfileWhereUniqueInput): Promise<Profile> {
    return this.prisma.profile.delete({
      where,
    });
  }
}

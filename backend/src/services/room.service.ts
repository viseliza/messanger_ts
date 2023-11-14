import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room, Prisma } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) { }
  
  async get(where: Prisma.RoomWhereInput): Promise<Room> {
    return await this.prisma.room.findFirst({ where });
  }

  async getMessagesFromRoom(data: Prisma.RoomWhereInput) {
    return await this.prisma.room.findMany({ where: { name: data.name }, select: { messages: true } })
  }
}
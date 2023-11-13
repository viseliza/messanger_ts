import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { Messages } from '../entitys/message.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) { }

  clientToUsers = {};

  identify(name: string, clientId: string) {
    this.clientToUsers[clientId] = name;

    return Object.values(this.clientToUsers);
  }

  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.message.create({
      data: {
        user_id: Number(createMessageDto.name),
        text: createMessageDto.text,
        time: createMessageDto.time,
        room_id: createMessageDto.room_id
      }
    });
  }

  async findAll(room) {
    return await this.prisma.message.findMany({ where: { room_id: room.id } });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}

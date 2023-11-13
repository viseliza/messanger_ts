import { Module } from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { MessagesGateway } from '../gateways/messages.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MessagesGateway, MessagesService, PrismaService],
})
export class MessagesModule {}

import { Module } from '@nestjs/common';
import { RoomController } from '../controllers/room.controller';
import { RoomService } from '../services/room.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
})
export class RoomModule {}

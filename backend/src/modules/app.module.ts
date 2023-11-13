import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { GroupModule } from './group.module';
import { ProfileModule } from './profile.module';
import { MessagesModule } from './messages.module';
import { RoomModule } from './room.module';

@Module({
  imports: [UserModule, GroupModule, ProfileModule, MessagesModule, RoomModule],
})
export class AppModule {}
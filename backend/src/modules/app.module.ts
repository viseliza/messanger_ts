import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { GroupModule } from './group.module';
import { ProfileModule } from './profile.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [UserModule, GroupModule, ProfileModule, MessagesModule],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { GroupModule } from './group.module';
import { ProfileModule } from './profile.module';

@Module({
  imports: [UserModule, GroupModule, ProfileModule],
})
export class AppModule {}
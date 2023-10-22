import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { GroupModule } from './group.module';

@Module({
  imports: [UserModule, GroupModule],
})
export class AppModule {}
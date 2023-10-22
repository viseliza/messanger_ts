import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { CronStart } from './cron/cron-job';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const cron = new CronStart();
}
bootstrap();
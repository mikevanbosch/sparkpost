import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`app running on: ${await app.getUrl()}`);
};
bootstrap();

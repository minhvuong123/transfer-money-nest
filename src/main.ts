import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 9001;
  await app.listen(PORT, () => console.log(`Running on Port ${PORT}`));
}
bootstrap();

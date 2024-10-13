import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001',  // Replace with the Next.js frontend URL
    credentials: true,
  };
  
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',  // Permitir cualquier origen
    methods: 'GET,POST',  // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization',  // Encabezados permitidos
  });
  await app.listen(8080);
}
bootstrap();

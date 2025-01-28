import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the port provided by Render or default to 3000
  const port = parseInt(process.env.PORT, 10) || 3000;

  app.enableCors(); // Allow cross-origin requests if necessary
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Strip out unwanted properties like `id`
            forbidNonWhitelisted: true, // Throw an error for unwanted properties
        }),
    );
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

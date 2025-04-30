import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = parseInt(process.env.API_PORT || '1337', 10);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    await app.listen(+port, () => console.log(`Sector21 API. Port: ${port}`));
}

bootstrap();

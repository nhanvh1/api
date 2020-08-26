import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, LogLevel} from "@nestjs/common";
import {ConfigService} from "./config/config.service";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const logger = new Logger('Bootstrap');
const configs = new ConfigService();

const NAME = configs.get('service.name');
const LOG_LEVEL = configs.get('log.level', ['log', 'error', 'warn', 'debug', 'verbose'] as LogLevel[]);
const PORT = configs.get('service.port');
const PACKAGE = configs.package('name');
const GLOBAL_PREFIX = configs.get('service.globalPrefix');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: LOG_LEVEL,
        cors: true,
    });

    // Swagger
    const options = new DocumentBuilder()
        .setTitle(PACKAGE)
        .setDescription('The document about Sticker API')
        .addTag('Sticker')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${GLOBAL_PREFIX}/_docs`, app, document);

    await app.listen(PORT);
}
bootstrap().then(() => logger.log(`${NAME.toUpperCase()} started at ${PORT}`));

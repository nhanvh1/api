import {Logger, LogLevel, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/all-exceptions.filter';
import { ConfigService } from './config/config.service';

const logger = new Logger('Bootstrap');
const configs = new ConfigService();

const NAME = configs.get('service.name');
const LOG_LEVEL = configs.get('log.level', ['log', 'error', 'warn', 'debug', 'verbose'] as LogLevel[]);
const PORT = configs.get('service.port');
const GLOBAL_PREFIX = configs.get('service.globalPrefix');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: LOG_LEVEL,
    });

    // Swagger
    const options = new DocumentBuilder()
        .setTitle(NAME.toUpperCase())
        .setDescription(`The document about ${NAME} API`)
        .addTag('GHTK')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${GLOBAL_PREFIX}/docs`, app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
        }),
    );
    // app.useGlobalFilters(new AllExceptionFilter());

    await app.listen(PORT);
}

bootstrap().then(() => logger.log(`${NAME.toUpperCase()} started at ${PORT}`));

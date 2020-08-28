import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GhtkService } from './ghtk.service';
import { GhtkController } from './ghtk.controller';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 1000,
            maxRedirects: 5,
        }),
    ],
    providers: [GhtkService],
    controllers: [GhtkController],
    exports: [GhtkService],
})
export class GhtkModule {}

import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { GhtkService } from './ghtk.service';
import { GhtkController } from '../main/ghtk.controller';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule.register({
            timeout: 1000,
            maxRedirects: 5,
        }),
        // MongooseModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: (configs: ConfigService): MongooseModuleOptions => ({
        //         uri: configs.get('stores.mongo'),
        //         useUnifiedTopology: true,
        //         useNewUrlParser: true,
        //         useCreateIndex: true,
        //     }),
        //     inject: [ConfigService],
        // }),
    ],
    providers: [GhtkService],
    controllers: [GhtkController],
    exports: [GhtkService],
})
export class GhtkModule {}

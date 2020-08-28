import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import {ProviderService} from "./provider.service";
import {ProviderController} from "./provider.controller";
import {MongoStoreModule} from "../mongo-store.module";

@Module({
    imports: [
        MongoStoreModule,
        ConfigModule,
        HttpModule.register({
            timeout: 1000,
            maxRedirects: 5,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configs: ConfigService): MongooseModuleOptions => ({
                uri: configs.get('stores.mongo'),
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [ProviderService],
    controllers: [ProviderController],
    exports: [ProviderService],
})
export class ProviderModule {}

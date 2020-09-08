import { HttpModule, Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { MongoStoreModule } from '../mongo-store.module';
import { ProviderService } from '../provider/provider.service';
import {ZaloService} from "./zalo.service";
import {ZaloController} from "./zalo.controller";

@Module({
    imports: [
        MongoStoreModule,
        ConfigModule,
        HttpModule.register({
            timeout: 1000,
            maxRedirects: 5,
        }),
    ],
    providers: [ZaloService, ProviderService],
    controllers: [ZaloController],
    exports: [ZaloService],
})
export class ZaloModule {}

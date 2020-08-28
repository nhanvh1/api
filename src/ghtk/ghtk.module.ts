import { HttpModule, Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { MongoStoreModule } from '../mongo-store.module';
import { ProviderService } from '../provider/provider.service';
import { GhtkController } from './ghtk.controller';
import { GhtkService } from './ghtk.service';

@Module({
    imports: [
        MongoStoreModule,
        ConfigModule,
        HttpModule.register({
            timeout: 1000,
            maxRedirects: 5,
        }),
    ],
    providers: [GhtkService, ProviderService],
    controllers: [GhtkController],
    exports: [GhtkService],
})
export class GhtkModule {}

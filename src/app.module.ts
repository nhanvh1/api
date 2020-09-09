import { HttpModule, Module } from '@nestjs/common';

import { GhtkModule } from './ghtk/ghtk.module';
import { ProviderModule } from './provider/provider.module';
import {ZaloModule} from "./zalo/zalo.module";
// import {RolesGuard} from "./common/guards";

@Module({
    imports: [GhtkModule, ProviderModule, HttpModule, ZaloModule],
    controllers: [],
    // providers: [
    //     {
    //         provide: APP_GUARD,
    //         useClass: RolesGuard
    //     }
    // ]
})
export class AppModule {}

import { HttpModule, Module } from '@nestjs/common';

import { GhtkModule } from './ghtk/ghtk.module';
import { ProviderModule } from './provider/provider.module';
import {APP_GUARD} from "@nestjs/core";
// import {RolesGuard} from "./common/guards";

@Module({
    imports: [GhtkModule, ProviderModule, HttpModule],
    controllers: [],
    // providers: [
    //     {
    //         provide: APP_GUARD,
    //         useClass: RolesGuard
    //     }
    // ]
})
export class AppModule {}

import { HttpModule, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GhtkModule } from './ghtk/ghtk.module';
import {ProviderModule} from "./provider/provider.module";

@Module({
    imports: [GhtkModule, ProviderModule, HttpModule],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}

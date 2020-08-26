import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {GhtkModule} from "./ghtk/ghtk.module";

@Module({
  imports: [GhtkModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

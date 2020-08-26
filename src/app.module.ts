import {HttpModule, Module} from '@nestjs/common';
import { AppService } from './app.service';
import { GhtkModule } from './ghtk/ghtk.module';

@Module({
  imports: [GhtkModule, HttpModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

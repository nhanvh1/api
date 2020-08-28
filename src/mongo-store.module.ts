import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProviderRepository } from './provider/stores/provider.repository';
import { ProviderSchema } from './provider/stores/provider.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Provider',
                schema: ProviderSchema,
            },
        ]),
    ],
    providers: [ProviderRepository],
    exports: [ProviderRepository],
})
export class MongoStoreModule {}

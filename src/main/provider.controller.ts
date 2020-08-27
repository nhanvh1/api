import { GhtkService } from '../ghtk/ghtk.service';
import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import { API_ROUTE } from '../enums/api.enums';
import { GhtkFeeRequestDto } from '../ghtk/ghtk.dto';
import {ProviderService} from "../provider/provider.service";
import {ProviderCreateRequestDto} from "../provider/provider.dto";

@ApiBearerAuth()
@ApiTags('Provider')
@Controller('provider')
export class ProviderController {
    constructor(private readonly service: ProviderService) {}

    /**
     * Create new Provicer
     *
     */
    @Post(API_ROUTE.PROVIDER_CREATE)
    @ApiOperation({ summary: 'Get fee' })
    // @UseInterceptors(ResponseInterceptor)
    async create(@Body() body: ProviderCreateRequestDto) {
        const { name, key, description, token, url } = body;
        return this.service.create(name, key, description, token, url)
    }

    /**
     * Get Provider by Key
     */
    @Get(API_ROUTE.PROVIDER_GET)
    @ApiParam({ name: 'key', required: true })
    @ApiOperation({ summary: 'Get fee' })
    // @UseInterceptors(ResponseInterceptor)
    async get(@Param('key') key: string) {
        return this.service.getByKey(key);
    }

    /**
     * Update Provider by Key
     */
    @Put(API_ROUTE.PROVIDER_UPDATE)
    @ApiParam({ name: 'key', required: true })
    @ApiOperation({ summary: 'Get fee' })
    // @UseInterceptors(ResponseInterceptor)
    async update(@Param('key') key: string,
                 @Body() body: ProviderCreateRequestDto) {
        const { name, description, token, url } = body;
        return this.service.updateByKey(name, key, description, token, url);
    }
}

import {Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiParam,  ApiTags} from '@nestjs/swagger';
import { API_ROUTE } from '../enums/api.enums';
import {ProviderService} from "./provider.service";
import {ProviderCreateRequestDto} from "./provider.dto";

@ApiBearerAuth()
@ApiTags('Provider')
@Controller()
export class ProviderController {
    constructor(private readonly service: ProviderService) {}

    /**
     * Create new Provider
     *
     */
    @Post(API_ROUTE.PROVIDER_CREATE)
    @ApiOperation({ summary: 'Create new Provider' })
    async create(@Body() body: ProviderCreateRequestDto) {
        const { name, key, description, token, url } = body;
        return this.service.create(name, key, description, token, url)
    }

    /**
     * Get All Providers
     */
    @Get(API_ROUTE.PROVIDER_GET_ALL)
    @ApiOperation({ summary: 'Get all Providers' })
    async getAll() {
        return this.service.getAll();
    }

    /**
     * Get Provider by Key
     */
    @Get(API_ROUTE.PROVIDER_GET)
    @ApiParam({ name: 'key', required: true })
    @ApiOperation({ summary: 'Get provider by key' })
    async getByKey(@Param('key') key: string) {
        return this.service.getByKey(key);
    }

    /**
     * Update Provider by Key
     */
    @Put(API_ROUTE.PROVIDER_UPDATE)
    @ApiParam({ name: 'key', required: true })
    @ApiOperation({ summary: 'Update Provider by Key' })
    async update(@Param('key') key: string,
                 @Body() body: ProviderCreateRequestDto) {
        const { name, description, token, url } = body;
        return this.service.updateByKey(name, key, description, token, url);
    }

    /**
     * Delete Provider by Key
     */
    @Delete(API_ROUTE.PROVIDER_DELETE)
    @ApiParam({ name: 'key', required: true })
    @ApiOperation({ summary: 'Delete Provider' })
    async deleteProvider(@Param('key') key: string) {
        return this.service.deleteProvider(key);
    }

}

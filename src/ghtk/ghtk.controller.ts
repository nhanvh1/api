import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { API_ROUTE } from '../enums/api.enums';
import { GhtkFeeRequestDto, GhTkOrderCreateDto } from './ghtk.dto';
import { GhtkService } from './ghtk.service';

@ApiBearerAuth()
@ApiTags('GHTK')
@Controller()
export class GhtkController {
    constructor(private readonly service: GhtkService) {}

    /**
     * Create new Order
     *
     */
    @Post(API_ROUTE.GHTK_ORDER_CREATE)
    @ApiOperation({ summary: 'Create new Provider' })
    async create(@Body() body: GhTkOrderCreateDto) {
        const {
            orderId,
            pick_name,
            pick_address,
            pick_province,
            pick_district,
            pick_ward,
            pick_tel,
            tel,
            name,
            address,
            province,
            district,
            ward,
            hamlet,
            is_freeship,
            pick_date,
            pick_money,
            note,
            value,
        } = body;
        const products = [
            {
                name: 'bút',
                weight: 0.1,
                quantity: 1,
            },
            {
                name: 'tẩy',
                weight: 0.2,
                quantity: 1,
            },
        ];
        return this.service.createOrder(
            orderId,
            pick_name,
            pick_address,
            pick_province,
            pick_district,
            pick_ward,
            pick_tel,
            tel,
            name,
            address,
            province,
            district,
            ward,
            hamlet,
            is_freeship,
            pick_date,
            pick_money,
            note,
            value,
            products,
        );
    }

    /**
     * Get Fee
     *
     * @return ContactListResponseInterface
     */
    @Get(API_ROUTE.GHTK_FEE)
    @ApiParam({ name: 'address', required: true })
    @ApiQuery({ name: 'province', required: true })
    @ApiQuery({ name: 'district', required: true })
    @ApiQuery({ name: 'pick_province', required: true })
    @ApiQuery({ name: 'pick_district', required: true })
    @ApiQuery({ name: 'weight', required: true })
    @ApiQuery({ name: 'value', required: true })
    @ApiOperation({ summary: 'Get fee' })
    async getFee(@Param('address') address: string, @Query() params: GhtkFeeRequestDto) {
        const { province, district, pick_province, pick_district, weight, value } = params;
        return this.service.calculateFee(address, province, district, pick_province, pick_district, weight, value);
    }

    /**
     * Get pick address
     *
     * @return ContactListResponseInterface
     */
    @Get(API_ROUTE.GHTK_PICK_ADDRESS)
    @ApiOperation({ summary: 'Get pick address' })
    async getPickAddress() {
        return this.service.getPickAddress();
    }
}

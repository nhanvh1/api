import { GhtkService } from '../ghtk/ghtk.service';
import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import { API_ROUTE } from '../enums/api.enums';
import { GhtkFeeRequestDto } from '../ghtk/ghtk.dto';

@ApiBearerAuth()
@ApiTags('GHTK')
@Controller('ghtk')
export class GhtkController {
    constructor(private readonly service: GhtkService) {}

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
    // @UseInterceptors(ResponseInterceptor)
    async getFee(@Param('address') address: string, @Query() params: GhtkFeeRequestDto) {
        const { province, district, pick_province, pick_district, weight, value } = params;
        console.log('params ', JSON.stringify(params));
        return this.service.calculateFee(address, province, district, pick_province, pick_district, weight, value);
    }
}

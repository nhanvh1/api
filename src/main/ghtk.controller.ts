import {GhtkService} from "../ghtk/ghtk.service";
import {Controller, Get, Param, UseInterceptors} from "@nestjs/common";
import {ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {API_ROUTE} from "../enums/api.enums";

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
    // @ApiParam({ name: 'address', required: true })
    // @ApiParam({ name: 'province', required: true })
    // @ApiParam({ name: 'district', required: true })
    // @ApiParam({ name: 'pick_province', required: true })
    // @ApiParam({ name: 'pick_district', required: true })
    // @ApiParam({ name: 'weight', required: true })
    // @ApiParam({ name: 'value', required: true })
    @ApiOperation({ summary: 'Get fee' })
    // @UseInterceptors(ResponseInterceptor)
    async getFee(@Param('address') address: string,
                 @Param('province') province: string,
                 @Param('district') district: string,
                 @Param('pick_province') pick_province: string,
                 @Param('pick_district') pick_district: string,
                 @Param('weight') weight: number,
                 @Param('value') value: number) {
        console.log('address ', address);
        return this.service.calculateFee(address,
            province,
            district,
            pick_province,
            pick_district,
            weight,
            value);
    }
}
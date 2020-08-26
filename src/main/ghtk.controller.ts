import {GhtkService} from "../ghtk/ghtk.service";
import {Controller, Get, UseInterceptors} from "@nestjs/common";
import {ApiOperation, ApiParam, ApiQuery, ApiResponse} from "@nestjs/swagger";

@Controller()
export class GhtkController {
    constructor(private readonly service: GhtkService) {}

    /**
     * Details of collection
     *
     * @return ContactListResponseInterface
     * @param param
     * @param queries
     */
    @Get('get')
    @ApiParam({ name: 'collectionId', required: true })
    @ApiQuery({ name: 'owner', required: false })
    @ApiOperation({ summary: 'Details of collection' })
    // @UseInterceptors(ResponseInterceptor)
    async getFee() {
        return this.service.calculateFee();
    }
}
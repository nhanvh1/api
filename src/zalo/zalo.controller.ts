import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import {ZaloService} from "./zalo.service";
import {API_ROUTE} from "../enums/api.enums";
import {ZaloCategoriesGetDto} from "./zalo.dto";

@ApiBearerAuth()
@ApiTags('Zalo')
@Controller()
export class ZaloController {
    constructor(private readonly service: ZaloService) {
    }

    /**
     * Thông tin người dùng
     *
     */
    @Get(API_ROUTE.ZALO_PROFILE)
    async getProfile() {
        return this.service.getProfile();
    }
}
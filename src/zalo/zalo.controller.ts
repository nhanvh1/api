import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import {ZaloService} from "./zalo.service";

@ApiBearerAuth()
@ApiTags('Zalo')
@Controller()
export class ZaloController {
    constructor(private readonly service: ZaloService) {
    }
}
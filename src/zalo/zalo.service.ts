import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
const configs = new ConfigService();

@Injectable()
export class ZaloService {
    private headersRequest;
    private URL;
}
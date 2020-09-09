import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import {ProviderService} from "../provider/provider.service";
const configs = new ConfigService();

@Injectable()
export class ZaloService {
    private headersRequest;
    private URL;
    private TOKEN;
    private readonly KEY = configs.get('providers.zalo.key');
    private readonly GET_CATEGORIES;

    constructor(private readonly http: HttpService, private readonly provider: ProviderService) {
        this.GET_CATEGORIES = '/category/getcategoryofoa';
    }

    async onInit(): Promise<void> {
        const objProvider = await this.provider.getByKey(this.KEY);
        this.URL = objProvider.url;
        this.TOKEN  = objProvider.token;
        this.headersRequest = {
            'Content-Type': 'application/json',
            Token: `${objProvider.token}`,
        };
    }

    async getMethod(endpoint: string) {
        endpoint += `&access_token=${this.TOKEN}`;
        console.log(`endpoint ${endpoint}`);
        return this.http.get(encodeURI(endpoint), { headers: this.headersRequest, timeout: 5000 }).toPromise();
    }

    async getProfile() {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += `?fields=id,birthday,name,gender,picture`;
        const res = await this.getMethod(endpoint);
        return res.data;
    }

    async getCategories() {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.GET_CATEGORIES;
        const res = await this.getMethod(endpoint);
        return res.data;
    }

}
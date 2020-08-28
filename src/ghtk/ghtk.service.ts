import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { ProviderService } from '../provider/provider.service';
const configs = new ConfigService();

@Injectable()
export class GhtkService {
    private headersRequest;
    private URL;
    private readonly KEY = configs.get('providers.ghtk.key');
    private readonly FEE;
    private readonly ORDER_CREATE;

    constructor(private readonly http: HttpService, private readonly provider: ProviderService) {
        this.FEE = '/services/shipment/fee';
        this.ORDER_CREATE = 'services/shipment/order/?ver=1.5';
    }

    async onInit(): Promise<void> {
        const objProvider = await this.provider.getByKey(this.KEY);
        this.URL = objProvider.url;
        this.headersRequest = {
            'Content-Type': 'application/json',
            Token: `${objProvider.token}`,
        };
    }

    async getMethod(endpoint: string) {
        return this.http.get(encodeURI(endpoint), { headers: this.headersRequest }).toPromise();
    }

    async postMethod(endpoint: string, body: any) {
        return this.http.post(encodeURI(endpoint), body, { headers: this.headersRequest }).toPromise();
    }

    async calculateFee(
        address: string,
        province: string,
        district: string,
        pick_province: string,
        pick_district: string,
        weight: number,
        value: number,
    ) {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.FEE;
        endpoint += `?address=${address}`;
        endpoint += `&province=${province}`;
        endpoint += `&district=${district}`;
        endpoint += `&pick_province=${pick_province}`;
        endpoint += `&pick_district=${pick_district}`;
        endpoint += `&weight=${weight}`;
        endpoint += `&value=${value}`;
        const res = await this.getMethod(endpoint);
        return res.data;
    }

    async createOrder(
        orderId: string,
        pick_name: string,
        pick_address: string,
        pick_province: string,
        pick_district: string,
        pick_ward: string,
        pick_tel: string,
        tel: string,
        name: string,
        address: string,
        province: string,
        district: string,
        ward: string,
        hamlet: string,
        is_freeship: number,
        pick_date: Date,
        pick_money: number,
        note: string,
        value: number,
        products: any,
    ) {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.ORDER_CREATE;
        const order = {
            id: orderId,
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
        };
        const body = {
            products,
            order,
        };
        console.log('body ', JSON.stringify(body));
        const res = await this.postMethod(endpoint, body);
        return res.data;
    }
}

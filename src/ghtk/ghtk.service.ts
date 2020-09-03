import { HttpService, Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { ProviderService } from '../provider/provider.service';
const configs = new ConfigService();

@Injectable()
export class GhtkService {
    private headersRequest;
    private URL;
    private readonly KEY = configs.get('providers.ghtk.key');
    private readonly GET_FEE;
    private readonly GET_PICK_ADD;
    private readonly GET_ADDRESS_4;
    private readonly ORDER_CREATE;
    private readonly ORDER_STATUS;
    private readonly ORDER_CANCEL;
    private readonly ORDER_LABEL;

    constructor(private readonly http: HttpService, private readonly provider: ProviderService) {
        this.GET_FEE = '/services/shipment/fee';
        this.GET_PICK_ADD = '/services/shipment/list_pick_add';
        this.GET_ADDRESS_4 = '/services/address/getAddressLevel4';

        this.ORDER_CREATE = '/services/shipment/order/?ver=1.5';
        this.ORDER_STATUS = '/services/shipment/v2/S1.A1.17373471';
        this.ORDER_CANCEL = '/services/shipment/cancel/S1.17373471';
        this.ORDER_LABEL = '/services/label/S1.8663516';
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
        console.log(`endpoint ${endpoint}`);
        return this.http.get(encodeURI(endpoint), { headers: this.headersRequest }).toPromise();
    }

    async postMethod(endpoint: string, body: any) {
        return this.http.post(encodeURI(endpoint), body, { headers: this.headersRequest }).toPromise();
    }

    async getPickAddress() {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.GET_PICK_ADD;
        const res = await this.getMethod(endpoint);
        return res.data;
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
        endpoint += this.GET_FEE;
        endpoint += `?address=${address}`;
        endpoint += `&province=${province}`;
        endpoint += `&district=${district}`;
        endpoint += `&pick_province=${pick_province}`;
        endpoint += `&pick_district=${pick_district}`;
        endpoint += `&weight=${weight}`;
        endpoint += `&value=${value}`;
        console.log(`endpoint ${endpoint}`);
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

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
    private readonly POST_ORDER_CREATE;
    private readonly GET_ORDER_STATUS;
    private readonly POST_ORDER_CANCEL;
    private readonly GET_ORDER_LABEL;

    constructor(private readonly http: HttpService, private readonly provider: ProviderService) {
        this.GET_FEE = '/services/shipment/fee';
        this.GET_PICK_ADD = '/services/shipment/list_pick_add';
        this.GET_ADDRESS_4 = '/services/address/getAddressLevel4';
        this.GET_ORDER_LABEL = '/services/label/';
        this.GET_ORDER_STATUS = '/services/shipment/v2/';
        this.POST_ORDER_CANCEL = '/services/shipment/cancel/';

        this.POST_ORDER_CREATE = '/services/shipment/order/?ver=1.5';
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
        return this.http.get(encodeURI(endpoint), { headers: this.headersRequest, timeout: 5000 }).toPromise();
    }

    async postMethod(endpoint: string, body: any) {
        // console.log(`endpoint ${endpoint}`);
        return this.http.post(encodeURI(endpoint), body, { headers: this.headersRequest, timeout: 5000 }).toPromise();
    }

    async getAddress4(address: string,
                      province: string,
                      district: string,
                      ward_street: string) {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.GET_ADDRESS_4;
        endpoint += `?address=${address}`;
        endpoint += `&province=${province}`;
        endpoint += `&district=${district}`;
        endpoint += `&ward_street=${ward_street}`;
        const res = await this.getMethod(endpoint);
        return res.data;
    }

    async getPickAddress() {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.GET_PICK_ADD;
        const res = await this.getMethod(endpoint);
        return res.data;
    }

    async getFee(
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
        const res = await this.getMethod(endpoint);
        return res.data;
    }

    /**
     * In nhãn đơn hàng
     * Nhãn đơn hàng bao gồm các thông tin của đơn hàng cần dán lên kiện hàng, gồm các thông tin mô tả đơn hàng, mã vạch của đơn hàng.
     *
     * @return ContactListResponseInterface
     */
    async getLabel(orderId: string) {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.GET_ORDER_LABEL;
        endpoint += orderId;
        const res = await this.getMethod(endpoint);
        return res.data;
    }

    /**
     * Trạng thái đơn hàng
     * Sau khi danh sách các đơn hàng được gửi tới hệ thống của Giaohangtietkiem. Khách hàng có thể kiểm tra trạng thái các đơn hàng dựa vào mã đơn hàng
     *
     * @return ContactListResponseInterface
     */
    async getStatus(orderId: string) {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.GET_ORDER_STATUS;
        endpoint += orderId;
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
        endpoint += this.POST_ORDER_CREATE;
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
        const res = await this.postMethod(endpoint, body);
        return res.data;
    }

    async cancelOrder(orderId: string) {
        await this.onInit();
        let endpoint = this.URL;
        endpoint += this.POST_ORDER_CANCEL;
        endpoint += orderId;
        const res = await this.postMethod(endpoint, {});
        return res.data;
    }

}

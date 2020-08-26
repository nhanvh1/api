import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../config/config.service";
const configs = new ConfigService();

@Injectable()
export class GhtkService {
    private headersRequest;
    private readonly url;
    private readonly fee;
    constructor(private readonly http: HttpService) {
        const token = configs.get('providers.ghtk.token');
        this.url = configs.get('providers.ghtk.url');
        this.fee = configs.get('providers.ghtk.api.get-fee');
        this.headersRequest = {
            'Content-Type': 'application/json',
            'Token': `${token}`,
        };
    }

    async getMethod(endpoint: string) {
        return this.http.get(encodeURI(endpoint), { headers: this.headersRequest }).toPromise();
    }

    async calculateFee(address: string,
                       province: string,
                       district: string,
                       pick_province: string,
                       pick_district: string,
                       weight: number,
                       value: number) {
        let endpoint = this.url;
        endpoint += this.fee;
        endpoint += `?address=${address}`;
        endpoint += `&province=${province}`;
        endpoint += `&district=${district}`;
        endpoint += `&pick_province=${pick_province}`;
        endpoint += `&pick_district=${pick_district}`;
        endpoint += `&weight=${weight}`;
        endpoint += `&value=${value}`;
        console.log('endpoint ', endpoint);
        const res = await this.getMethod(endpoint);
        return res.data;
    }

}
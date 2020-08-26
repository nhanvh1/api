import {HttpService, Injectable} from "@nestjs/common";
import {ConfigService} from "../config/config.service";
const configs = new ConfigService();

@Injectable()
export class GhtkService {
    private headersRequest;
    constructor(private readonly http: HttpService) {
        const token = '0be018749d42FA179887F30AA4eA05b22d3f3f9d';
        this.headersRequest = {
            'Content-Type': 'application/json',
            'Token': `${token}`,
        };
    }

    async calculateFee() {
        const endpoint = `https://services.giaohangtietkiem.vn/services/shipment/fee?address=P.503%20t%C3%B2a%20nh%C3%A0%20Auu%20Vi%E1%BB%87t,%20s%E1%BB%91%201%20L%C3%AA%20%C4%90%E1%BB%A9c%20Th%E1%BB%8D&province=H%C3%A0%20n%E1%BB%99i&district=Qu%E1%BA%ADn%20C%E1%BA%A7u%20Gi%E1%BA%A5y&pick_province=H%C3%A0%20N%E1%BB%99i&pick_district=Qu%E1%BA%ADn%20Hai%20B%C3%A0%20Tr%C6%B0ng&weight=1000&value=3000000`;
        const res = await this.http.get(endpoint, {headers: this.headersRequest}).toPromise();
        console.log('res ', res.data);
        return res.data;
    }
}
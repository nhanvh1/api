import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ProviderRepository} from "./stores/provider.repository";
import {ProviderDocumentInterface} from "./stores/provider.model";
import {STATUS_CODES} from "http";


@Injectable()
export class ProviderService {
    constructor(private readonly repo: ProviderRepository) {}

    async create(
        name: string,
        key: string,
        description: string,
        token: string,
        url: string,
    ): Promise<ProviderDocumentInterface> {
        return this.repo.createProvider(name, key, description, token, url);
    }

    async getByKey(key: string): Promise<ProviderDocumentInterface> {
        const res = this.repo.getByKey(key);
        console.log('res', JSON.stringify(res));
        if(res) return  res;
        throw new HttpException('Provider is not found', HttpStatus.NOT_FOUND);
    }


}
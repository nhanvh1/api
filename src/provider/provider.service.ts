import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ProviderDocumentInterface } from './stores/provider.model';
import { ProviderRepository } from './stores/provider.repository';

@Injectable()
export class ProviderService {
    constructor(private readonly repo: ProviderRepository) {}

    async create(
        name: string,
        key: string,
        description: string,
        storeId: string,
        token: string,
        url: string,
        redirect: string,
    ): Promise<ProviderDocumentInterface> {
        return this.repo.createProvider(name, key, description, storeId, token, url, redirect);
    }

    async getByKey(key: string): Promise<ProviderDocumentInterface> {
        const res = await this.repo.getByKey(key);
        if (res) return res;
        throw new HttpException('Provider is not found', HttpStatus.NOT_FOUND);
    }

    async getAll(): Promise<ProviderDocumentInterface[]> {
        return await this.repo.getAll();
    }

    async updateByKey(
        name: string,
        key: string,
        description: string,
        storeId: string,
        token: string,
        url: string,
        redirect: string,
    ): Promise<ProviderDocumentInterface> {
        return this.repo.updateByKey(name, key, description, storeId, token, url, redirect);
    }

    async deleteProvider(key: string): Promise<ProviderDocumentInterface> {
        return this.repo.deleteProvider(key);
    }
}

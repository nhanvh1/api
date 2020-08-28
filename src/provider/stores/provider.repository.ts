import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {ProviderDocumentInterface, ProviderModelInterface} from "./provider.model";

@Injectable()
export class ProviderRepository {
    constructor(@InjectModel('Provider') private readonly model: ProviderModelInterface) {}

    async createProvider(
        name: string,
        key: string,
        description: string,
        storeId: string,
        token: string,
        url: string,
        redirect: string,
    ): Promise<ProviderDocumentInterface> {
        let doc = await this.model.getByKey(key);
        if(doc) throw new HttpException('Provider key is existing', HttpStatus.BAD_REQUEST);
        doc = new this.model({name, key, description, storeId, token, url, redirect});
        return doc.save();
    }

    async getAll(): Promise<ProviderDocumentInterface[]> {
        return this.model.getAll();
    }

    async getByKey(key: string): Promise<ProviderDocumentInterface> {
        return this.model.getByKey(key);
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
        const doc = await this.model.getByKey(key);
        if(doc)
            return doc.updateByKey(name, description, storeId, token, url, redirect);
        throw new HttpException('Provider is not found', HttpStatus.NOT_FOUND);

    }

    async deleteProvider(key: string): Promise<ProviderDocumentInterface> {
        const doc = await this.model.getByKey(key);
        if(doc)
            return doc.deleteProvider();
        throw new HttpException('Provider is not found', HttpStatus.NOT_FOUND);

    }
}
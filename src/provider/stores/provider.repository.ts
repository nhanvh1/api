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
        token: string,
        url: string,
    ): Promise<ProviderDocumentInterface> {
        const doc = new this.model({name, key, description, token, url});
        return doc.save();
    }

    async getByKey(key: string): Promise<ProviderDocumentInterface> {
        return this.model.getByKey(key);

    }

    async updateByKey(
        name: string,
        key: string,
        description: string,
        token: string,
        url: string,
    ): Promise<ProviderDocumentInterface> {
        const doc = await this.model.getByKey(key);
        if(doc)
            return doc.updateByKey(name, description, token, url);
        throw new HttpException('Provider is not found', HttpStatus.NOT_FOUND);

    }
}
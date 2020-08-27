import {Injectable} from "@nestjs/common";
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
}
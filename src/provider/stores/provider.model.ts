import { Document, Model, Types } from 'mongoose';


export interface ProviderModel {
    name: string,
    key: string,
    description: string,
    token: string,
    url: string
}

export interface ProviderDocumentInterface extends ProviderModel, Document {

}

export interface ProviderModelInterface extends Model<ProviderDocumentInterface> {
    getByKey: (key: string) => Promise<ProviderDocumentInterface>;
}
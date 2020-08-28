import { Document, Model } from 'mongoose';


export interface ProviderModel {
    name: string,
    key: string,
    description: string,
    token: string,
    url: string
}

export interface ProviderDocumentInterface extends ProviderModel, Document {
    updateByKey: (name: string, description: string, token: string, url: string) => Promise<ProviderDocumentInterface>;
    deleteProvider: () => Promise<ProviderDocumentInterface>;
}

export interface ProviderModelInterface extends Model<ProviderDocumentInterface> {
    getByKey: (key: string) => Promise<ProviderDocumentInterface>;
    getAll: () => Promise<ProviderDocumentInterface[]>;
}
import { Document, Model } from 'mongoose';


export interface ProviderModel {
    name: string,
    key: string,
    description: string,
    storeId: string,
    token: string,
    url: string,
    redirect: string,
}

export interface ProviderDocumentInterface extends ProviderModel, Document {
    updateByKey: (name: string,
                  description: string,
                  storeId: string,
                  token: string,
                  url: string,
                  redirect: string) => Promise<ProviderDocumentInterface>;
    deleteProvider: () => Promise<ProviderDocumentInterface>;
}

export interface ProviderModelInterface extends Model<ProviderDocumentInterface> {
    getByKey: (key: string) => Promise<ProviderDocumentInterface>;
    getAll: () => Promise<ProviderDocumentInterface[]>;
}

/*
* {
"name": "Giao Hàng Tiết Kiệm",
"key": "GHTK",
"description": "API Giao Hàng Tiết Kiệm",
"storeId": "",
"token": "0be018749d42FA179887F30AA4eA05b22d3f3f9d",
"url": "https://services.giaohangtietkiem.vn",
"redirect": "",
}
* */


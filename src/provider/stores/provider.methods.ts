import {ProviderDocumentInterface} from "./provider.model";

/**
 * Update collection name
 *
 * @return StickerCollectionDocumentInterface
 * @param name
 * @param description
 * @param storeId
 * @param token
 * @param url
 * @param redirect
 */
export async function updateByKey(name: string,
                                  description: string,
                                  storeId: string,
                                  token: string,
                                  url: string,
                                  redirect: string): Promise<ProviderDocumentInterface> {
    this.set({ name, description, storeId, token, url, redirect});
    await this.save();
    return this;
}

export async function deleteProvider(): Promise<ProviderDocumentInterface> {
    const deletedAt = Date.now();
    this.set({ deletedAt });
    await this.save();
    return this;
}
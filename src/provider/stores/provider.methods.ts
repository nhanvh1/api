import {ProviderDocumentInterface} from "./provider.model";

/**
 * Update collection name
 *
 * @return StickerCollectionDocumentInterface
 * @param name
 * @param description
 * @param token
 * @param url
 */
export async function updateByKey(name: string,
                                  description: string,
                                  token: string,
                                  url: string): Promise<ProviderDocumentInterface> {
    this.set({ name, description, token, url });
    await this.save();
    return this;
}

export async function deleteProvider(): Promise<ProviderDocumentInterface> {
    const deletedAt = Date.now();
    this.set({ deletedAt });
    await this.save();
    return this;
}
/**
 * Update collection name
 *
 * @return StickerCollectionDocumentInterface
 * @param collectionName
 */
import {ProviderDocumentInterface} from "./provider.model";

export async function updateByKey(name: string,
                                  description: string,
                                  token: string,
                                  url: string): Promise<ProviderDocumentInterface> {
    this.set({ name, description, token, url });
    await this.save();
    return this;
}
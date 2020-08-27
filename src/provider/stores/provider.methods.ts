/**
 * Update collection name
 *
 * @return StickerCollectionDocumentInterface
 * @param collectionName
 */
import {ProviderDocumentInterface} from "./provider.model";

export async function setName(collectionName: string): Promise<ProviderDocumentInterface> {
    this.set({ collectionName });
    await this.save();
    return this;
}
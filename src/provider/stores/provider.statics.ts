import {ProviderDocumentInterface, ProviderModelInterface} from "./provider.model";

/**
 * Get Provider by Key
 *
 */
export async function getByKey(this: ProviderModelInterface, key: string): Promise<ProviderDocumentInterface> {
    return this.findOne({ key});
}

/**
 * Get list Provider
 *
 */
export async function getAll(this: ProviderModelInterface): Promise<ProviderDocumentInterface[]> {
    return this.find({ deletedAt: null});
}
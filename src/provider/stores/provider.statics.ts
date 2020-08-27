import {ProviderDocumentInterface, ProviderModelInterface} from "./provider.model";

/**
 * Get Provider by Ky
 *
 */
export async function getByKey(
    this: ProviderModelInterface,
    key: string,
): Promise<ProviderDocumentInterface> {
    return this.findOne({ key});
}
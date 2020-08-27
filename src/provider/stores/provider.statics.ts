/**
 * Get list collections by Owner
 *
 * @return StickerCollectionDocumentInterface[]
 * @param owner
 */
export async function getByKey(
    this: StickerCollectionModelInterface,
    owner: string,
): Promise<StickerCollectionDocumentInterface[]> {
    const type: StickerTypeEnums = StickerTypeEnums.CUSTOM;
    return this.find({ owner, type });
}
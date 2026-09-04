export const galleryCategories = ['Homes', 'Construction', 'Civil Works', 'Interiors', 'Completed Projects'] as const

export type GalleryItem = {
  _id: string
  title: string
  description: string
  category: string
  filename: string
  contentType: string
  fileId: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export function serializeGalleryItem(item: {
  _id: { toString(): string }
  title: string
  description: string
  category: string
  filename: string
  contentType: string
  fileId: { toString(): string }
  createdAt: Date
  updatedAt: Date
}): GalleryItem {
  return {
    _id: item._id.toString(),
    title: item.title,
    description: item.description,
    category: item.category,
    filename: item.filename,
    contentType: item.contentType,
    fileId: item.fileId.toString(),
    imageUrl: `/api/gallery/image/${item.fileId.toString()}`,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  }
}

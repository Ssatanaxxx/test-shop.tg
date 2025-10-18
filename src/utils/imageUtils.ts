import type { ProductImage } from "../types/types";
// Не тронутый утилит, ибо он все равно не прогружает картинки ;(
export const getValidImageUrl = (images: ProductImage[]): string | null => {
  if (!images || images.length === 0) return null;

  const mainImage = images.find(img => img.MainImage);
  if (mainImage) {
    return getImageUrl(mainImage);
  }

  const firstImage = images[0];
  return getImageUrl(firstImage);
};

export const getImageUrl = (image: ProductImage): string | null => {
  if (image.Image_URL && isValidUrl(image.Image_URL)) {
    return image.Image_URL;
  }
  if (image.image_url && isValidUrl(image.image_url)) {
    return image.image_url;
  }
  if (image.Category_Image && isValidUrl(image.Category_Image)) {
    return image.Category_Image;
  }
  
  return null;
};

export const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;
  
  const invalidPatterns = [
    'https://google.com/',
    'example.com',
    'placeholder'
  ];
  
  return !invalidPatterns.some(pattern => url.includes(pattern)) && 
         url.startsWith('http') && 
         url.length > 10;
};

export const getFallbackImage = (): string => {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjBGMEYwIi8+CjxwYXRoIGQ9Ik04MCA2MEgxMjBWMTIwSDgwVjYwWiIgZmlsbD0iI0Q4RDhEOCIvPgo8L3N2Zz4K';
};
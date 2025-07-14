
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Product Images - Main image with thumbnails on the right */}
      <div className="flex gap-4">
        {/* Main Image */}
        <div className="flex-1 aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer">
          <img
            src={images[selectedImageIndex]}
            alt={productName}
            className="w-full h-full object-cover"
            onClick={() => handleImageClick(selectedImageIndex)}
          />
        </div>
        
        {/* Thumbnail Column */}
        <div className="flex flex-col gap-3 w-20">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedImageIndex === index 
                  ? 'ring-2 ring-black' 
                  : 'hover:opacity-75'
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`${productName} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Gallery Dialog */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main image */}
            <img
              src={images[selectedImageIndex]}
              alt={`${productName} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductImageGallery;

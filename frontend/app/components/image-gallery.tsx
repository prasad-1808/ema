
import { useState } from "react";
import { Trash2, ImageIcon } from "lucide-react";
import { StoredImage } from "~/lib/image-store";
import { cn } from "~/lib/utils";

interface ImageGalleryProps {
  images: StoredImage[];
  onRemove: (id: string) => void;
  onImageClick: (image: StoredImage) => void;
}

export function ImageGallery({ images, onRemove, onImageClick }: ImageGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-6 rounded-full bg-muted mb-4">
          <ImageIcon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-medium text-foreground mb-2">
          No photos yet
        </h3>
        <p className="text-muted-foreground max-w-sm">
          Upload your first photos to start building your gallery of precious memories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square rounded-xl overflow-hidden bg-muted shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {!loadedImages.has(image.id) && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
            </div>
          )}

          <img
            src={image.url}
            alt={image.name}
            className={cn(
              "w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105",
              loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
            )}
            onClick={() => onImageClick(image)}
            onLoad={() => setLoadedImages((prev) => new Set(prev).add(image.id))}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(image.id);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/90 text-destructive opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-background shadow-md"
            aria-label="Delete image"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-sm text-background font-medium truncate">
              {image.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

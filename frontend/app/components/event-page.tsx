
import { useState, useCallback } from "react";
import { Camera } from "lucide-react";
import type { EventType } from "~/lib/events";
import { useImageStore, type StoredImage } from "~/lib/image-store";
import { ImageUpload } from "./image-upload";
import { ImageGallery } from "./image-gallery";
import { ImagePreviewModal } from "./image-preview-modal";
import { FloralDecoration } from "./floral-decoration";

interface EventPageProps {
  event: EventType;
}

export function EventPage({ event }: EventPageProps) {
  const addImages = useImageStore((state) => state.addImages);
  const removeImage = useImageStore((state) => state.removeImage);
  const allImages = useImageStore((state) => state.images);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);

  const eventImages = allImages.filter((img) => img.eventSlug === event.slug);

  const handleUpload = useCallback(
    async (files: File[]) => {
      console.log("Upload started with files:", files);
      setIsUploading(true);
      try {
        await addImages(event.slug, files);
        console.log("Upload completed");
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    },
    [event.slug, addImages]
  );

  const handleRemove = useCallback(
    (id: string) => {
      removeImage(id);
    },
    [removeImage]
  );

  const handleImageClick = useCallback((image: StoredImage) => {
    setSelectedImage(image);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImage) return;

      const currentIndex = eventImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      let newIndex: number;

      if (direction === "prev") {
        newIndex = currentIndex > 0 ? currentIndex - 1 : eventImages.length - 1;
      } else {
        newIndex = currentIndex < eventImages.length - 1 ? currentIndex + 1 : 0;
      }

      setSelectedImage(eventImages[newIndex]);
    },
    [selectedImage, eventImages]
  );

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mb-4" />
          
          <div className="flex items-center justify-center gap-3 mb-3">
            <Camera className="h-6 w-6 text-primary" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              {event.name}
            </h1>
          </div>
          
          <p className="text-muted-foreground max-w-md mx-auto">
            Capture and cherish the beautiful moments from our {event.name.toLowerCase()} celebration.
          </p>
          
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mt-4 rotate-180" />
        </header>

        <section className="mb-8 sm:mb-12">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-medium text-foreground mb-4">
              Add Photos
            </h2>
            <ImageUpload onUpload={handleUpload} isUploading={isUploading} />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-medium text-foreground">
              Gallery
            </h2>
            {eventImages.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {eventImages.length} photo{eventImages.length !== 1 && "s"}
              </span>
            )}
          </div>
          
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <ImageGallery
              images={eventImages}
              onRemove={handleRemove}
              onImageClick={handleImageClick}
            />
          </div>
        </section>
      </div>

      <ImagePreviewModal
        image={selectedImage}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
        hasMultiple={eventImages.length > 1}
      />
    </div>
  );
}

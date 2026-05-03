import { useState, useCallback } from "react";
import { Camera, Calendar, MapPin } from "lucide-react";
import type { Event } from "~/lib/types";
import { useImageStore, type StoredImage } from "~/lib/image-store";
import { ImageUpload } from "./image-upload";
import { ImageGallery } from "./image-gallery";
import { ImagePreviewModal } from "./image-preview-modal";
import { FloralDecoration } from "./floral-decoration";

interface EventPageProps {
  event: Event;
  ceremony: string; // "marriage" | "engagement" | "reception"
}

export function EventPage({ event, ceremony }: EventPageProps) {
  const addImages = useImageStore((state) => state.addImages);
  const removeImage = useImageStore((state) => state.removeImage);
  const allImages = useImageStore((state) => state.images);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);

  const storeKey = `${event.event_id}:${ceremony}`;
  const eventImages = allImages.filter((img) => img.eventSlug === storeKey);

  const ceremonyData =
    ceremony === "marriage"
      ? event.event_marriage
      : ceremony === "engagement"
      ? event.event_engagement
      : event.event_reception;

  const handleUpload = useCallback(
    async (files: File[]) => {
      setIsUploading(true);
      try {
        await addImages(storeKey, files);
      } finally {
        setIsUploading(false);
      }
    },
    [storeKey, addImages]
  );

  const handleRemove = useCallback((id: string) => removeImage(id), [removeImage]);
  const handleImageClick = useCallback((image: StoredImage) => setSelectedImage(image), []);
  const handleCloseModal = useCallback(() => setSelectedImage(null), []);

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (!selectedImage) return;
      const idx = eventImages.findIndex((img) => img.id === selectedImage.id);
      const next =
        direction === "prev"
          ? (idx - 1 + eventImages.length) % eventImages.length
          : (idx + 1) % eventImages.length;
      setSelectedImage(eventImages[next]);
    },
    [selectedImage, eventImages]
  );

  const title = `${event.event_name} — ${ceremony.charAt(0).toUpperCase() + ceremony.slice(1)}`;

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 sm:mb-12">
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mb-4" />
          <div className="flex items-center justify-center gap-3 mb-3">
            <Camera className="h-6 w-6 text-primary" />
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
              {title}
            </h1>
          </div>
          {ceremonyData && (
            <div className="flex flex-col items-center gap-1 text-muted-foreground text-sm mt-2">
              <span>{ceremonyData.groom_name} &amp; {ceremonyData.bride_name}</span>
              {"marriage_date" in ceremonyData && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(ceremonyData.marriage_date).toLocaleDateString()}
                </span>
              )}
              {"engagement_date" in ceremonyData && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(ceremonyData.engagement_date).toLocaleDateString()}
                </span>
              )}
              {"reception_date" in ceremonyData && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(ceremonyData.reception_date).toLocaleDateString()}
                </span>
              )}
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {"marriage_location" in ceremonyData
                  ? ceremonyData.marriage_location
                  : "engagement_location" in ceremonyData
                  ? ceremonyData.engagement_location
                  : ceremonyData.reception_location}
              </span>
            </div>
          )}
          <FloralDecoration className="w-32 h-16 mx-auto text-primary mt-4 rotate-180" />
        </header>

        <section className="mb-8 sm:mb-12">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="font-serif text-xl font-medium text-foreground mb-4">Add Photos</h2>
            <ImageUpload onUpload={handleUpload} isUploading={isUploading} />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-medium text-foreground">Gallery</h2>
            {eventImages.length > 0 && (
              <span className="text-sm text-muted-foreground">
                {eventImages.length} photo{eventImages.length !== 1 && "s"}
              </span>
            )}
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <ImageGallery images={eventImages} onRemove={handleRemove} onImageClick={handleImageClick} />
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

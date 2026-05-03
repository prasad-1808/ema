
import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { StoredImage } from "~/lib/image-store";

interface ImagePreviewModalProps {
  image: StoredImage | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
  hasMultiple: boolean;
}

export function ImagePreviewModal({
  image,
  onClose,
  onNavigate,
  hasMultiple,
}: ImagePreviewModalProps) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasMultiple) {
        onNavigate("prev");
      } else if (e.key === "ArrowRight" && hasMultiple) {
        onNavigate("next");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [image, onClose, onNavigate, hasMultiple]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <div
        className="absolute inset-0 bg-foreground/90 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
        aria-label="Close preview"
      >
        <X className="h-6 w-6" />
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={() => onNavigate("prev")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={() => onNavigate("next")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/10 hover:bg-background/20 text-background transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      )}

      <div className="relative max-w-[90vw] max-h-[90vh] animate-in zoom-in-95 duration-200">
        <img
          src={image.url}
          alt={image.name}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent rounded-b-lg">
          <p className="text-background text-sm font-medium truncate">
            {image.name}
          </p>
          {hasMultiple && (
            <p className="text-background/70 text-xs mt-1">
              Use arrow keys to navigate
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

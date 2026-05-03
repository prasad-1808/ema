
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface StoredImage {
  id: string;
  url: string;
  name: string;
  eventSlug: string;
  createdAt: number;
}

interface ImageStore {
  images: StoredImage[];
  addImages: (eventSlug: string, files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  getImagesByEvent: (eventSlug: string) => StoredImage[];
}

export const useImageStore = create<ImageStore>()(
  persist(
    (set, get) => ({
      images: [],
      addImages: async (eventSlug: string, files: File[]) => {
        console.log("addImages called with:", eventSlug, files.length, "files");
        const newImages: StoredImage[] = await Promise.all(
          files.map(async (file) => {
            const url = await fileToDataUrl(file);
            return {
              id: crypto.randomUUID(),
              url,
              name: file.name,
              eventSlug,
              createdAt: Date.now(),
            };
          })
        );
        console.log("New images created:", newImages.length);
        set((state) => {
          const updated = [...state.images, ...newImages];
          console.log("Store updated, total images:", updated.length);
          return { images: updated };
        });
      },
      removeImage: (id: string) => {
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        }));
      },
      getImagesByEvent: (eventSlug: string) => {
        return get().images.filter((img) => img.eventSlug === eventSlug);
      },
    }),
    {
      name: "wedding-images",
    }
  )
);

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

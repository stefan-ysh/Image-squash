import { create } from "zustand";
import { generateId } from "@/lib/utils";

export type OutputFormat = "original" | "jpeg" | "png" | "webp";
export type CompressionStatus = "pending" | "compressing" | "done" | "error";

export interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalFormat: OutputFormat;
  compressedSize?: number;
  originalUrl: string;
  compressedUrl?: string;
  compressedBlob?: Blob;
  status: CompressionStatus;
  error?: string;
  progress: number;
}

export interface CompressionSettings {
  format: OutputFormat;
  quality: number;
  maxWidth: number;
  maxHeight: number;
  maintainAspectRatio: boolean;
}

interface CompressionStore {
  // State
  images: ImageFile[];
  selectedImageId: string | null;
  settings: CompressionSettings;
  isCompressing: boolean;
  
  // Actions
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  clearAllImages: () => void;
  selectImage: (id: string | null) => void;
  updateImage: (id: string, updates: Partial<ImageFile>) => void;
  updateSettings: (settings: Partial<CompressionSettings>) => void;
  setIsCompressing: (value: boolean) => void;
  
  // Getters
  getSelectedImage: () => ImageFile | undefined;
  getPendingImages: () => ImageFile[];
  getCompletedImages: () => ImageFile[];
}

function getFormatFromMimeType(mimeType: string): OutputFormat {
  if (mimeType === "image/jpeg" || mimeType === "image/jpg") return "jpeg";
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  return "jpeg"; // Default fallback
}

const defaultSettings: CompressionSettings = {
  format: "original",
  quality: 80,
  maxWidth: 4096,
  maxHeight: 4096,
  maintainAspectRatio: true,
};

export const useCompressionStore = create<CompressionStore>((set, get) => ({
  images: [],
  selectedImageId: null,
  settings: defaultSettings,
  isCompressing: false,

  addImages: (files: File[]) => {
    const newImages: ImageFile[] = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: generateId(),
        file,
        name: file.name,
        originalSize: file.size,
        originalFormat: getFormatFromMimeType(file.type),
        originalUrl: URL.createObjectURL(file),
        status: "pending" as CompressionStatus,
        progress: 0,
      }));

    set((state) => {
      const images = [...state.images, ...newImages];
      return {
        images,
        selectedImageId: state.selectedImageId || newImages[0]?.id || null,
      };
    });
  },

  removeImage: (id: string) => {
    set((state) => {
      const image = state.images.find((img) => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.originalUrl);
        if (image.compressedUrl) {
          URL.revokeObjectURL(image.compressedUrl);
        }
      }
      const images = state.images.filter((img) => img.id !== id);
      return {
        images,
        selectedImageId:
          state.selectedImageId === id
            ? images[0]?.id || null
            : state.selectedImageId,
      };
    });
  },

  clearAllImages: () => {
    const { images } = get();
    images.forEach((image) => {
      URL.revokeObjectURL(image.originalUrl);
      if (image.compressedUrl) {
        URL.revokeObjectURL(image.compressedUrl);
      }
    });
    set({ images: [], selectedImageId: null });
  },

  selectImage: (id: string | null) => {
    set({ selectedImageId: id });
  },

  updateImage: (id: string, updates: Partial<ImageFile>) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, ...updates } : img
      ),
    }));
  },

  updateSettings: (newSettings: Partial<CompressionSettings>) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    }));
  },

  setIsCompressing: (value: boolean) => {
    set({ isCompressing: value });
  },

  getSelectedImage: () => {
    const { images, selectedImageId } = get();
    return images.find((img) => img.id === selectedImageId);
  },

  getPendingImages: () => {
    const { images } = get();
    return images.filter((img) => img.status === "pending");
  },

  getCompletedImages: () => {
    const { images } = get();
    return images.filter((img) => img.status === "done");
  },
}));

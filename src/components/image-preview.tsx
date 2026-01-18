"use client";

import { useCompressionStore } from "@/store/compression-store";
import { formatFileSize, calculateCompressionRatio } from "@/lib/utils";
import { Compare } from "@/components/ui/compare";

export function ImagePreview() {
  const { images, selectedImageId } = useCompressionStore();

  const selectedImage = images.find((img) => img.id === selectedImageId);

  if (!selectedImage) {
    return (
      <div className="flex h-96 items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50">
        <p className="text-muted-foreground">Select an image to preview</p>
      </div>
    );
  }

  const hasCompressed = selectedImage.status === "done" && selectedImage.compressedUrl;
  const compressionRatio = hasCompressed
    ? calculateCompressionRatio(selectedImage.originalSize, selectedImage.compressedSize!)
    : 0;

  return (
    <div className="space-y-4">
      {/* Preview area */}
      <div className="relative overflow-hidden rounded-xl border bg-[#0a0a0a] aspect-video">
        {hasCompressed ? (
          <Compare
            firstImage={selectedImage.originalUrl}
            secondImage={selectedImage.compressedUrl}
            className="h-full w-full rounded-xl"
            slideMode="hover"
            showHandlebar={true}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImage.originalUrl}
              alt="Original"
              className="max-h-full max-w-full object-contain"
              draggable={false}
            />
          </div>
        )}
        
        {/* Status overlay */}
        {selectedImage.status === "compressing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
              <p className="mt-2 text-white">Compressing... {selectedImage.progress}%</p>
            </div>
          </div>
        )}
        
        {/* Labels */}
        {hasCompressed && (
          <>
            <div className="absolute left-4 top-4 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm pointer-events-none">
              Original
            </div>
            <div className="absolute right-4 top-4 rounded-md bg-black/70 px-2 py-1 text-xs text-white backdrop-blur-sm pointer-events-none">
              Compressed
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Original</p>
          <p className="text-lg font-semibold">{formatFileSize(selectedImage.originalSize)}</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Compressed</p>
          <p className={`text-lg font-semibold ${hasCompressed ? "text-green-500" : ""}`}>
            {hasCompressed ? formatFileSize(selectedImage.compressedSize!) : "—"}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Saved</p>
          <p className={`text-lg font-semibold ${hasCompressed ? "text-green-500" : ""}`}>
            {hasCompressed ? `${compressionRatio}%` : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

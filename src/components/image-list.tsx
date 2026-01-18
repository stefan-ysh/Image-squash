"use client";

import { X, CheckCircle2, Loader2, AlertCircle, Image as ImageIcon } from "lucide-react";
import { useCompressionStore, ImageFile } from "@/store/compression-store";
import { formatFileSize, cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

function ImageListItem({ image }: { image: ImageFile }) {
  const { selectedImageId, selectImage, removeImage } = useCompressionStore();
  const isSelected = selectedImageId === image.id;

  const statusIcon = {
    pending: <ImageIcon className="h-4 w-4 text-muted-foreground" />,
    compressing: <Loader2 className="h-4 w-4 animate-spin text-violet-500" />,
    done: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    error: <AlertCircle className="h-4 w-4 text-red-500" />,
  };

  return (
    <div
      className={cn(
        "group relative flex cursor-pointer items-center gap-3 rounded-xl border border-transparent p-2 transition-all hover:bg-accent/50",
        isSelected && "border-primary/50 bg-primary/5"
      )}
      onClick={() => selectImage(image.id)}
    >
      {/* Thumbnail */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.compressedUrl || image.originalUrl}
          alt={image.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0.5 right-0.5 rounded bg-background/80 p-0.5">
          {statusIcon[image.status]}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 overflow-hidden">
        <p className="truncate text-sm font-medium">{image.name}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{formatFileSize(image.originalSize)}</span>
          {image.status === "done" && image.compressedSize && (
            <>
              <span>→</span>
              <span className="text-green-500">
                {formatFileSize(image.compressedSize)}
              </span>
            </>
          )}
        </div>
        {image.status === "compressing" && (
          <Progress value={image.progress} className="mt-1 h-1" />
        )}
      </div>

      {/* Remove button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-1 -top-1 h-6 w-6 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          removeImage(image.id);
        }}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

export function ImageList() {
  const { images, clearAllImages } = useCompressionStore();

  if (images.length === 0) {
    return null;
  }

  const completedCount = images.filter((img) => img.status === "done").length;
  const totalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const compressedSize = images.reduce(
    (sum, img) => sum + (img.compressedSize || img.originalSize),
    0
  );

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Images</h3>
          <p className="text-xs text-muted-foreground">
            {completedCount}/{images.length} compressed
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllImages}
          className="text-xs text-muted-foreground hover:text-destructive"
        >
          Clear all
        </Button>
      </div>

      {completedCount > 0 && (
        <div className="mb-3 rounded-lg bg-green-500/10 p-2 text-center text-xs text-green-500">
          Saved {formatFileSize(totalSize - compressedSize)} (
          {Math.round((1 - compressedSize / totalSize) * 100)}% reduction)
        </div>
      )}

      <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {images.map((image) => (
          <ImageListItem key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}

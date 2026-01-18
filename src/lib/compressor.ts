import imageCompression from "browser-image-compression";
import { CompressionSettings, OutputFormat, ImageFile } from "@/store/compression-store";

interface CompressOptions {
  file: File;
  settings: CompressionSettings;
  originalFormat?: OutputFormat;
  onProgress?: (progress: number) => void;
}

interface CompressResult {
  blob: Blob;
  url: string;
  size: number;
}

// Resolve 'original' format to actual format
function resolveFormat(format: OutputFormat, originalFormat?: OutputFormat): Exclude<OutputFormat, "original"> {
  if (format === "original") {
    return (originalFormat && originalFormat !== "original") ? originalFormat : "jpeg";
  }
  return format;
}

function getMimeType(format: Exclude<OutputFormat, "original">): string {
  const mimeTypes: Record<Exclude<OutputFormat, "original">, string> = {
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };
  return mimeTypes[format];
}

function getFileExtension(format: Exclude<OutputFormat, "original">): string {
  return format === "jpeg" ? "jpg" : format;
}

export async function compressImage({
  file,
  settings,
  originalFormat,
  onProgress,
}: CompressOptions): Promise<CompressResult> {
  const { format, quality, maxWidth, maxHeight, maintainAspectRatio } = settings;
  
  // Resolve 'original' to actual format
  const resolvedFormat = resolveFormat(format, originalFormat);

  // Configure compression options
  const options = {
    maxSizeMB: 50, // Max file size in MB
    maxWidthOrHeight: Math.max(maxWidth, maxHeight),
    useWebWorker: true,
    fileType: getMimeType(resolvedFormat),
    initialQuality: quality / 100,
    alwaysKeepResolution: !maintainAspectRatio,
    onProgress: (progress: number) => {
      onProgress?.(Math.round(progress * 100));
    },
  };

  try {
    // Compress the image
    const compressedFile = await imageCompression(file, options);
    
    // Convert to the target format if needed
    const blob = new Blob([compressedFile], { type: getMimeType(resolvedFormat) });
    const url = URL.createObjectURL(blob);

    return {
      blob,
      url,
      size: blob.size,
    };
  } catch (error) {
    console.error("Compression error:", error);
    throw new Error(`Failed to compress ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export async function compressBatch(
  files: { id: string; file: File }[],
  settings: CompressionSettings,
  onImageProgress: (id: string, progress: number) => void,
  onImageComplete: (id: string, result: CompressResult) => void,
  onImageError: (id: string, error: string) => void
): Promise<void> {
  // Process images with limited concurrency
  const concurrency = Math.min(navigator.hardwareConcurrency || 2, 4);
  const queue = [...files];
  const inFlight: Set<Promise<void>> = new Set();

  const processItem = async (item: { id: string; file: File }) => {
    try {
      const result = await compressImage({
        file: item.file,
        settings,
        onProgress: (progress) => onImageProgress(item.id, progress),
      });
      onImageComplete(item.id, result);
    } catch (error) {
      onImageError(item.id, error instanceof Error ? error.message : "Unknown error");
    }
  };

  while (queue.length > 0 || inFlight.size > 0) {
    // Start new tasks up to concurrency limit
    while (queue.length > 0 && inFlight.size < concurrency) {
      const item = queue.shift()!;
      const promise = processItem(item).finally(() => {
        inFlight.delete(promise);
      });
      inFlight.add(promise);
    }

    // Wait for at least one task to complete
    if (inFlight.size > 0) {
      await Promise.race(inFlight);
    }
  }
}

export function getOutputFilename(originalName: string, format: OutputFormat, originalFormat?: OutputFormat): string {
  const baseName = originalName.replace(/\.[^/.]+$/, "");
  const resolvedFormat = resolveFormat(format, originalFormat);
  return `${baseName}-compressed.${getFileExtension(resolvedFormat)}`;
}

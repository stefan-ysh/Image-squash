"use client";

import { useState } from "react";
import { Play, Download, Loader2, Archive, Settings2 } from "lucide-react";
import { useCompressionStore, OutputFormat } from "@/store/compression-store";
import { compressImage, getOutputFilename } from "@/lib/compressor";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import JSZip from "jszip";

const formatOptions: { value: OutputFormat; label: string }[] = [
  { value: "original", label: "Original" },
  { value: "webp", label: "WebP" },
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
];

const presets = [
  { name: "Web", quality: 75, description: "Optimized for web" },
  { name: "High", quality: 85, description: "High quality" },
  { name: "Maximum", quality: 95, description: "Minimal loss" },
];

export function CompressionControls() {
  const {
    images,
    settings,
    updateSettings,
    updateImage,
    isCompressing,
    setIsCompressing,
  } = useCompressionStore();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const pendingImages = images.filter((img) => img.status === "pending");
  const completedImages = images.filter((img) => img.status === "done");

  const handleCompress = async () => {
    if (pendingImages.length === 0) return;

    setIsCompressing(true);

    for (const image of pendingImages) {
      updateImage(image.id, { status: "compressing", progress: 0 });

      try {
        const result = await compressImage({
          file: image.file,
          settings,
          originalFormat: image.originalFormat,
          onProgress: (progress) => {
            updateImage(image.id, { progress });
          },
        });

        updateImage(image.id, {
          status: "done",
          progress: 100,
          compressedSize: result.size,
          compressedUrl: result.url,
          compressedBlob: result.blob,
        });
      } catch (error) {
        updateImage(image.id, {
          status: "error",
          error: error instanceof Error ? error.message : "Compression failed",
        });
      }
    }

    setIsCompressing(false);

    toast({
      title: "Compression complete!",
      description: `${pendingImages.length} images processed successfully.`,
      variant: "success",
    });
  };

  const handleDownloadSingle = (imageId: string) => {
    const image = images.find((img) => img.id === imageId);
    if (!image?.compressedBlob) return;

    const link = document.createElement("a");
    link.href = URL.createObjectURL(image.compressedBlob);
    link.download = getOutputFilename(image.name, settings.format, image.originalFormat);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  const handleDownloadAll = async () => {
    if (completedImages.length === 0) return;

    setIsDownloading(true);

    try {
      if (completedImages.length === 1) {
        handleDownloadSingle(completedImages[0].id);
      } else {
        const zip = new JSZip();

        completedImages.forEach((image) => {
          if (image.compressedBlob) {
            zip.file(getOutputFilename(image.name, settings.format, image.originalFormat), image.compressedBlob);
          }
        });

        const content = await zip.generateAsync({ type: "blob" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "compressed-images.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }

      toast({
        title: "Download started!",
        description:
          completedImages.length === 1
            ? "Image downloaded successfully."
            : `${completedImages.length} images downloaded as ZIP.`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "An error occurred while downloading.",
        variant: "destructive",
      });
    }

    setIsDownloading(false);
  };

  return (
    <div className="space-y-6 rounded-xl border bg-card p-6">
      <div className="flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold">Settings</h3>
      </div>

      {/* Format */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Output Format</label>
        <Select
          value={settings.format}
          onValueChange={(value: OutputFormat) => updateSettings({ format: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {formatOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quality */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Quality</label>
          <span className="text-sm text-muted-foreground">{settings.quality}%</span>
        </div>
        <Slider
          value={[settings.quality]}
          onValueChange={([value]) => updateSettings({ quality: value })}
          min={10}
          max={100}
          step={5}
        />
        {/* Presets */}
        <div className="flex gap-2">
          {presets.map((preset) => (
            <Button
              key={preset.name}
              variant={settings.quality === preset.quality ? "secondary" : "ghost"}
              size="sm"
              className="flex-1 text-xs"
              onClick={() => updateSettings({ quality: preset.quality })}
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Max dimensions */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Max Dimensions</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Width</label>
            <input
              type="number"
              value={settings.maxWidth}
              onChange={(e) => updateSettings({ maxWidth: parseInt(e.target.value) || 4096 })}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Height</label>
            <input
              type="number"
              value={settings.maxHeight}
              onChange={(e) => updateSettings({ maxHeight: parseInt(e.target.value) || 4096 })}
              className="h-9 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2 pt-4 border-t">
        <Button
          className="w-full gap-2"
          onClick={handleCompress}
          disabled={pendingImages.length === 0 || isCompressing}
        >
          {isCompressing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Compressing...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Compress {pendingImages.length > 0 ? `(${pendingImages.length})` : ""}
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          className="w-full gap-2"
          onClick={handleDownloadAll}
          disabled={completedImages.length === 0 || isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing...
            </>
          ) : (
            <>
              {completedImages.length > 1 ? (
                <Archive className="h-4 w-4" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download {completedImages.length > 0 ? `(${completedImages.length})` : ""}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

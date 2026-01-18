"use client";

import { useCompressionStore } from "@/store/compression-store";
import { FileUpload } from "@/components/ui/file-upload";

interface UploadZoneProps {
  compact?: boolean;
}

export function UploadZone({ compact = false }: UploadZoneProps) {
  const { addImages } = useCompressionStore();

  const handleFilesChange = (files: File[]) => {
    if (files.length > 0) {
      addImages(files);
    }
  };

  if (compact) {
    return (
      <div className="w-full rounded-xl border border-dashed border-border bg-card/50 overflow-hidden">
        <FileUpload onChange={handleFilesChange} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto min-h-96 border border-dashed rounded-xl border-border bg-card/50 overflow-hidden">
      <FileUpload onChange={handleFilesChange} />
    </div>
  );
}

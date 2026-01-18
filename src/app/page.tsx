"use client";

import { UploadZone } from "@/components/upload-zone";
import { ImageList } from "@/components/image-list";
import { CompressionControls } from "@/components/compression-controls";
import { ImagePreview } from "@/components/image-preview";
import { Header } from "@/components/header";
import { FeaturesSection } from "@/components/features-section";
import { useCompressionStore } from "@/store/compression-store";

export default function Home() {
  const { images, selectedImageId } = useCompressionStore();
  const hasImages = images.length > 0;

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {!hasImages ? (
          <>
            {/* Hero Section */}
            <div className="text-center py-12 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ImageSquash
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Professional image compression tool — Fast, Secure, Free
              </p>
            </div>
            
            {/* Upload Zone */}
            <div className="flex items-center justify-center min-h-[400px]">
              <UploadZone />
            </div>
            
            {/* Features Section */}
            <FeaturesSection />
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel - Image List */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 space-y-4">
                <ImageList />
                <UploadZone compact />
              </div>
            </div>

            {/* Center Panel - Preview */}
            <div className="lg:col-span-6">
              {selectedImageId ? (
                <ImagePreview />
              ) : (
                <div className="flex items-center justify-center h-96 rounded-xl border-2 border-dashed border-border bg-card/50">
                  <p className="text-muted-foreground">Select an image to preview</p>
                </div>
              )}
            </div>

            {/* Right Panel - Controls */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <CompressionControls />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


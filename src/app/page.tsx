"use client";

import { UploadZone } from "@/components/upload-zone";
import { ImageList } from "@/components/image-list";
import { CompressionControls } from "@/components/compression-controls";
import { ImagePreview } from "@/components/image-preview";
import { Header } from "@/components/header";
import { FeaturesSection } from "@/components/features-section";
import { useCompressionStore } from "@/store/compression-store";
import { motion } from "framer-motion";

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
            <motion.div 
              className="text-center py-12 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                ImageSquash
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Professional image compression tool — Fast, Secure, Free
              </motion.p>
              
              {/* Animated decorative elements */}
              <motion.div
                className="absolute top-32 left-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-40 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            {/* Upload Zone */}
            <motion.div 
              className="flex items-center justify-center min-h-[400px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <UploadZone />
            </motion.div>
            
            {/* Features Section */}
            <FeaturesSection />
          </>
        ) : (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Left Panel - Image List */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="sticky top-24 space-y-4">
                <ImageList />
                <UploadZone compact />
              </div>
            </motion.div>

            {/* Center Panel - Preview */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {selectedImageId ? (
                <ImagePreview />
              ) : (
                <div className="flex items-center justify-center h-96 rounded-xl border-2 border-dashed border-border bg-card/50">
                  <p className="text-muted-foreground">Select an image to preview</p>
                </div>
              )}
            </motion.div>

            {/* Right Panel - Controls */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="sticky top-24">
                <CompressionControls />
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

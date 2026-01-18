"use client";

import { 
  Zap, 
  Shield, 
  Layers, 
  Image as ImageIcon, 
  Download, 
  Globe,
  Smartphone,
  Palette,
  Server,
  FileImage,
  ArrowRight
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "WebAssembly-powered compression delivers near-native speed directly in your browser",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "All processing happens locally in your browser. Your images never leave your device",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description: "Compress multiple images at once with a single click download",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: ImageIcon,
    title: "Real-time Preview",
    description: "Interactive slider to compare original vs compressed side by side",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Export as WebP, JPEG, PNG or keep the original format",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: Palette,
    title: "Fine Control",
    description: "Customize quality, max dimensions, and more to fit your exact needs",
    gradient: "from-rose-500 to-red-500",
  },
];

const useCases = [
  {
    icon: Globe,
    title: "Website Optimization",
    description: "Reduce page load times and improve SEO rankings with optimized images",
    examples: ["Blog posts", "Product images", "Landing pages"],
  },
  {
    icon: Smartphone,
    title: "Social Media",
    description: "Quickly compress images to meet platform upload limits",
    examples: ["Instagram", "Twitter", "LinkedIn"],
  },
  {
    icon: Server,
    title: "Storage Savings",
    description: "Batch compress photo archives to save cloud storage space and costs",
    examples: ["Photo backups", "Document archives", "Asset libraries"],
  },
  {
    icon: FileImage,
    title: "Design Workflow",
    description: "Export lightweight design assets for easy team sharing",
    examples: ["UI mockups", "Prototypes", "Marketing assets"],
  },
];

const stats = [
  { value: "90%", label: "Avg. Compression" },
  { value: "100%", label: "Local Processing" },
  { value: "0", label: "Server Uploads" },
  { value: "∞", label: "Free Forever" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-20 space-y-24">
      {/* Stats Bar */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border hover:scale-105 transition-transform"
          >
            <motion.div 
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <div>
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Why ImageSquash?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional image compression that makes your images smaller and faster while maintaining exceptional visual quality
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl bg-card border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
            >
              <motion.div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* How It Works */}
      <div>
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Simple as 1-2-3</h2>
          <p className="text-muted-foreground">No signup required. No software to install. Just open and use.</p>
        </motion.div>
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { step: "01", title: "Upload", desc: "Drag & drop your images" },
            { step: "02", title: "Adjust", desc: "Choose format & quality" },
            { step: "03", title: "Download", desc: "Get compressed images" },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-center gap-4"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mb-3"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ rotate: -10 }}
                  whileInView={{ rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              {index < 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  <ArrowRight className="hidden md:block h-6 w-6 text-muted-foreground" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Use Cases */}
      <div>
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
          <p className="text-muted-foreground">Whether you&apos;re a blogger, developer, or designer, ImageSquash has you covered</p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border hover:border-violet-500/50 transition-all"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="p-3 rounded-xl bg-violet-500/10"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <useCase.icon className="h-6 w-6 text-violet-500" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        {example}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 p-12 text-center"
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR6TTI0IDI0aDJ2MmgtMnptMCAwaC0ydjJoMnptNCAwaDJ2MmgtMnptLTQgNGgydi0ySDI0em00IDBoMnYtMmgtMnptLTQgNGgydi0yaC0yem00IDBoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Start Compressing Your Images
          </motion.h2>
          <motion.p 
            className="text-white/80 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Completely free, no registration required, unlimited usage. Experience professional image compression today!
          </motion.p>
          <motion.a
            href="#top"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-violet-600 font-semibold rounded-full hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="text-center text-sm text-muted-foreground pt-8 border-t"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p>
          ImageSquash — Professional online image compression tool | Powered by{" "}
          <a href="https://squoosh.app" target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:underline">
            Squoosh
          </a>{" "}
          technology
        </p>
      </motion.footer>
    </section>
  );
}

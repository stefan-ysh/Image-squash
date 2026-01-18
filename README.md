# ImageSquash

![ImageSquash Logo](./public/logo.png)

<div align="center">

[**English**](./README.md) | [**中文**](./README_CN.md) | [**日本語**](./README_JP.md)

</div>

A professional, high-performance online image compression tool built with modern web technologies. ImageSquash processes generic images completely locally in your browser, ensuring 100% privacy while delivering superior compression results.

## ✨ Features

- **🔒 100% Privacy**: All compression happens client-side via WebAssembly. Your photos never leave your device.
- **⚡ Blazing Fast**: Powered by `browser-image-compression` and Web Workers for non-blocking performance.
- **🎨 Modern Design**: Beautiful UI with Aceternity components, Framer Motion animations, and responsive layout.
- **🔄 Batch Processing**: Drag & drop multiple images and compress them simultaneously.
- **👁️ Real-time Preview**: Interactive slider to compare before/after results instantly.
- **🛠️ Fine Control**: Customize quality, max dimensions, and output format (WebP, JPEG, PNG, or Original).
- **📦 Bulk Export**: Download single images or zip all compressed files with one click.
- **🌙 Dark/Light Mode**: Fully supported theming for comfortable usage in any environment.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Architecture**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Effects**: [Aceternity UI](https://ui.aceternity.com/) & [Framer Motion](https://www.framer.com/motion/)
- **Compression**: [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) (based on Squoosh technology)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/stefan-ysh/Image-squash.git
   cd Image-squash
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Run the development server

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1. **Upload**: Drag and drop your images into the upload zone or click to select files.
2. **Adjust settings**: Use the control panel to set quality (1-100), max width/height, and output format.
3. **Compare**: Click on any image in the list to preview the changes with the slider.
4. **Download**: Save individual images or click "Download All" to get a ZIP archive.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

[中文文档](./README_CN.md) | [日本語ドキュメント](./README_JP.md)

# ImageSquash 图片压缩工具

![ImageSquash Logo](./public/logo.png)

<div align="center">

[**English**](./README.md) | [**中文**](./README_CN.md) | [**日本語**](./README_JP.md)

</div>

ImageSquash 是一个基于现代 Web 技术构建的专业级在线图片压缩工具。它完全在浏览器端本地处理图片，在确保 100% 隐私安全的同时，提供卓越的压缩效果。

## ✨ 主要特性

- **🔒 绝对隐私**: 所有压缩过程均在本地浏览器通过 WebAssembly 完成。您的照片永远不会上传到服务器，确保绝对安全。
- **⚡ 极速体验**: 基于 `browser-image-compression` 和 Web Workers 多线程技术，提供流畅无阻塞的操作体验。
- **🎨 现代设计**: 采用 Aceternity UI 组件库，配合 Framer Motion 动效，界面精美且响应式适配所有设备。
- **🔄 批量处理**: 支持拖拽多张图片同时上传，一键批量压缩。
- **👁️ 实时预览**: 提供交互式滑块，可实时左右对比原图与压缩后的效果差异。
- **🛠️ 精细控制**: 支持自定义压缩质量 (1-100)、最大尺寸限制以及输出格式 (WebP, JPEG, PNG 或 原格式)。
- **📦 批量导出**: 支持单张下载或一键打包下载所有压缩后的图片 (ZIP)。
- **🌙 深色模式**: 完美支持深色/浅色主题切换，适应各种光线环境。

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **动效**: [Aceternity UI](https://ui.aceternity.com/) & [Framer Motion](https://www.framer.com/motion/)
- **压缩核心**: [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) (基于 Squoosh 技术)
- **图标**: [Lucide React](https://lucide.dev/)

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm / yarn / pnpm

### 安装步骤

1. 克隆项目仓库

   ```bash
   git clone https://github.com/stefan-ysh/Image-squash.git
   cd Image-squash
   ```

2. 安装依赖

   ```bash
   npm install
   ```

3. 启动开发服务器

   ```bash
   npm run dev
   ```

4. 在浏览器中访问 [http://localhost:3000](http://localhost:3000)

## 📖 使用指南

1. **上传**: 将图片拖拽到上传区域，或点击选择文件。
2. **调整**: 在右侧控制面板设置压缩质量、尺寸和目标格式。
3. **对比**: 点击列表中的任意图片，使用中间的滑块对比压缩前后的画质。
4. **下载**: 满意后可下载单张图片，或点击"Download All"下载压缩包。

## 📄 许可证

本项目开源并遵循 [MIT 许可证](LICENSE)。

---

[English Documentation](./README.md) | [日本語ドキュメント](./README_JP.md)

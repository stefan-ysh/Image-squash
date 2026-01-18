# ImageSquash 画像圧縮ツール

![ImageSquash Logo](./public/logo.png)

<div align="center">

[**English**](./README.md) | [**中文**](./README_CN.md) | [**日本語**](./README_JP.md)

</div>

ImageSquash（イメージスカッシュ）は、最新のWeb技術で構築されたプロフェッショナルなオンライン画像圧縮ツールです。画像の処理はすべてブラウザ内（ローカル）で行われるため、プライバシーを100%保護しながら、優れた圧縮結果を提供します。

## ✨ 主な特徴

- **🔒 100% プライバシー**: すべての圧縮処理はWebAssemblyを介してクライアントサイドで行われます。写真がデバイスから外部に送信されることはありません。
- **⚡ 超高速**: `browser-image-compression`とWeb Worker（マルチスレッド）技術により、スムーズでブロックのない操作体験を提供します。
- **🎨 モダンなデザイン**: Aceternity UIコンポーネントとFramer Motionアニメーションを採用し、美しくレスポンシブなインターフェースを実現しました。
- **🔄 バッチ処理**: 複数の画像をドラッグ＆ドロップして、一度にまとめて圧縮できます。
- **👁️ リアルタイムプレビュー**: インタラクティブなスライダーを使って、圧縮前後の画質を瞬時に比較できます。
- **🛠️ 詳細設定**: 圧縮品質（1-100）、最大サイズ制限、出力形式（WebP, JPEG, PNG, またはオリジナル）をカスタマイズ可能です。
- **📦 一括エクスポート**: 個別の画像ダウンロードはもちろん、すべての圧縮画像をZIPファイルとしてワンクリックでダウンロードできます。
- **🌙 ダークモード**: ダーク/ライトテーマの切り替えに完全対応しており、あらゆる環境で快適に使用できます。

## 🛠️ 技術スタック

- **フレームワーク**: [Next.js 15](https://nextjs.org/) (App Router)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **UIコンポーネント**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **アニメーション**: [Aceternity UI](https://ui.aceternity.com/) & [Framer Motion](https://www.framer.com/motion/)
- **圧縮コア**: [browser-image-compression](https://github.com/Donaldcwl/browser-image-compression) (Squoosh技術ベース)
- **アイコン**: [Lucide React](https://lucide.dev/)

## 🚀 はじめに

### 前提条件

- Node.js 18以上
- npm / yarn / pnpm

### インストール手順

1. リポジトリをクローンする

   ```bash
   git clone https://github.com/stefan-ysh/Image-squash.git
   cd Image-squash
   ```

2. 依存関係をインストールする

   ```bash
   npm install
   ```

3. 開発サーバーを起動する

   ```bash
   npm run dev
   ```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 📖 使い方

1. **アップロード**: 画像をアップロードエリアにドラッグ＆ドロップするか、クリックしてファイルを選択します。
2. **調整**: 右側のコントロールパネルで、圧縮品質、サイズ、および出力形式を設定します。
3. **比較**: リスト内の画像をクリックすると、中央のスライダーを使って圧縮前後の画質を比較できます。
4. **ダウンロード**: 満足のいく結果が得られたら、個別にダウンロードするか、「Download All」をクリックしてZIP形式で一括ダウンロードします。

## 📄 ライセンス

このプロジェクトはオープンソースであり、[MITライセンス](LICENSE)の下で提供されています。

---

[English Documentation](./README.md) | [中文文档](./README_CN.md)

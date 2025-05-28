# あしたぼホームページ開発用ドキュメント

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

このリポジトリは、あしたぼホームページに関連するドキュメントを管理するためのものです。
[Astro](https://astro.build/) と [Starlight](https://starlight.astro.build/) を使用して構築されています。

## 📚 ドキュメントの内容

このドキュメントサイトでは、あしたぼホームページの開発に携わってくださる皆さんに向けて、VS Codeの拡張機能から **useEfectは使うな** という話まで、さまざまな情報を提供しています。

詳細な内容は `src/content/docs/` ディレクトリ内の各ドキュメントを参照してください。

## 🚀 プロジェクト構造

Astro + Starlightプロジェクトの基本的なフォルダ構成は以下の通りです。

```
.
├── public/              # 静的アセット (faviconなど)
├── src/
│   ├── assets/          # 画像などのアセット
│   ├── components/      # Astroコンポーネント
│   ├── content/
│   │   ├── docs/        # Markdown/MDXドキュメントファイル
│   └── content.config.ts # Starlightの設定ファイル
├── astro.config.mjs     # Astroの設定ファイル
├── package.json
└── tsconfig.json
```

Starlightは `src/content/docs/` ディレクトリ内の `.md` または `.mdx` ファイルを検索し、それぞれのファイル名に基づいてルートを公開します。

`src/components/` ディレクトリには、Astroコンポーネントを配置します。これらのコンポーネントは、Markdownファイル内で使用できます。

画像は `src/assets/` に追加し、Markdownファイル内から相対リンクで埋め込むことができます。

ファビコンなどの静的アセットは `public/` ディレクトリに配置します。

## 🛠 開発環境のセットアップ
このプロジェクトをローカルで開発するためには、以下の手順に従ってください。
1. **Node.jsのインストール**: Node.jsがインストールされていない場合は、[Node.jsの公式サイト](https://nodejs.org/)からインストールしてください。
2. **依存関係のインストール**: プロジェクトのルートディレクトリで以下のコマンドを実行します。
   ```bash
   npm install
   ```
3. **ローカル開発サーバーの起動**: 以下のコマンドでローカルサーバーを起動します。
   ```bash
   npm run dev
   ```
4. **ブラウザで確認**: ブラウザで `http://localhost:4321` にアクセスすると、ローカルのStarlightドキュメントサイトが表示されます。

## 🧞 コマンド

すべてのコマンドは、プロジェクトのルートディレクトリからターミナルで実行します。

| コマンド                  | 説明                                                                 |
| :------------------------ | :------------------------------------------------------------------- |
| `npm install`             | 依存関係をインストールします                                         |
| `npm run dev`             | ローカル開発サーバーを `localhost:4321` で起動します                 |
| `npm run build`           | プロダクションサイトを `./dist/` にビルドします                      |
| `npm run preview`         | ビルドしたサイトをデプロイ前にローカルでプレビューします             |
| `npm run astro ...`       | `astro add` や `astro check` などのCLIコマンドを実行します           |
| `npm run astro -- --help` | Astro CLIのヘルプを表示します                                        |

## 👀 さらに詳しく知りたい場合

*   [Starlightドキュメント](https://starlight.astro.build/)
*   [Astroドキュメント](https://docs.astro.build/)
*   [Astro Discordサーバー](https://astro.build/chat)

---

# Figma基礎トレーニング教材

新卒デザイナー・企画メンバー向けのFigmaトレーニング教材です。
ブラウザで閲覧できるインタラクティブなスライド形式で、Figmaの基礎から実践的な使い方まで学べます。

## 📚 教材内容

- Auto Layoutの基礎と応用
- レスポンシブデザインの実装
- コンポーネントの作成と管理
- Variablesの活用
- ライブラリとDesign Tokens
- 実践的な移行課題

## 🚀 デプロイ方法（社内ホスティング向け）

### 必要な環境

- Node.js 20.x 以上
- npm 10.x 以上

### ビルド手順

```bash
# 依存関係のインストール
npm ci

# 本番用ビルド
npm run build
```

### デプロイ設定

- **Build Command**: `npm ci && npm run build`
- **Output Directory**: `dist`
- **Node Version**: 20.x 以上

### LandPress Internal 等での設定例

```yaml
build:
  command: npm ci && npm run build
  publish: dist
  environment:
    NODE_VERSION: 20
```

### 静的ファイル

ビルド完了後、`dist` フォルダに以下が生成されます：

- `index.html` - エントリーポイント
- `assets/` - JavaScript/CSSバンドル
- `images/` - 画像ファイル
- その他静的ファイル

すべてのルーティングは `index.html` で処理されます（SPA）。

## 💻 ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（ホットリロード有効）
npm run dev
```

開発サーバーは `http://localhost:5173` で起動します。

## 🔗 社内向け公開URL

ビルドした `dist` フォルダを社内ホスティングサービスにデプロイしてください。
GitHubアカウント不要でブラウザから直接アクセスできます。

## 🎨 教材の使い方

1. ブラウザでURLにアクセス
2. 左サイドバーからスライドを選択
3. 矢印キーまたは画面下部のボタンでページ移動
4. 右サイドバーでメモの追加が可能
5. ブックマーク機能で重要なスライドを保存

## 📝 技術スタック

- **Framework**: Vite + React 18
- **UI**: Tailwind CSS 4 + Radix UI
- **Build Tool**: Vite 6
- **Package Manager**: npm

## 🏢 権限について

- このリポジトリはprivateです
- ビルド成果物（静的サイト）は社内限定で公開されます
- GitHubアカウントがなくても、デプロイ後のURLにアクセスできます
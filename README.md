# kkd

3D グリッド上で立方体（ダイス）を転がす操作を訓練する Web アプリ。謎解きゲーム「kyubu kyubu dice」のトレーニング用です。

🔗 デモ: https://f-mm7.github.io/kkd/

## 概要

グリッド上に置かれた立方体を、矢印ボタンまたはキーボードの矢印キーで上下左右に転がします。立方体の各面（top / bottom / front / back / left / right）の向きはアニメーション中も整合的に保たれます。

## 操作

- **矢印ボタン**: 画面下部のボタンで方向を指定
- **キーボード**: 矢印キーで操作

## 開発

```bash
npm install
npm run dev      # 開発サーバ
npm run build    # ビルド
npm run lint     # ESLint
npm run deploy   # gh-pages へデプロイ
```

## 技術スタック

React 19 / TypeScript / Vite / Three.js / @react-three/fiber / @react-three/drei

---
title: React の基礎
description: A reference page in my new Starlight docs site.
---

このドキュメントでは、あしたぼコマ表開発で使用している **React**, **Next.js**, **TypeScript** の基本的な概念について解説します。VS Code で実際のコードを見ながら読み進めてください。

## React, Next.js, TypeScript とは？

まず、それぞれの技術がどのようなものか簡単に紹介します。

-   **React (React.js):**
    Meta 社（旧 Facebook 社）が開発した、ユーザーインターフェース（UI）を構築するための JavaScript ライブラリです。コンポーネントベースの開発を可能にし、効率的で再利用性の高い UI 開発を実現します。基本的な文法は JavaScript に準じますが、独自の概念や機能（JSX、仮想 DOM など）を持っています。

-   **TypeScript:**
    Microsoft 社が開発した、JavaScript に静的型付け機能を追加したプログラミング言語です。JavaScript のスーパーセット（上位互換）であり、大規模なアプリケーション開発において、コードの品質や保守性を向上させるのに役立ちます。
    -   **型 (Type) とは？**
        変数や関数の引数・戻り値などが、どのような種類のデータ（数値、文字列、真偽値など）を扱うかを定義するものです。例えば、`string`（文字列）、`number`（数値）、`boolean`（真偽値: true/false）などがあります。TypeScript では、コードを書いている段階で型の誤りを検知できるため、実行時エラーを減らすことができます。
        ```typescript
        let message: string = "こんにちは"; // 文字列型
        let count: number = 10;          // 数値型
        let isActive: boolean = true;    // 真偽値型
        ```

-   **Next.js:**
    React をベースとした、Web アプリケーション開発のためのフレームワークです。サーバーサイドレンダリング (SSR)、静的サイト生成 (SSG)、ファイルベースルーティング（App Router）、API ルートなど、モダンな Web 開発に必要な機能を提供し、React アプリケーションの開発をより効率的かつ高機能にします。

## App Router (Next.js)

Next.js の重要な機能の一つである App Router について説明します。

### App Router の基本

App Router は、Next.js アプリケーションのルーティング（URL と表示されるページの対応付け）を管理する仕組みです。`src/app` ディレクトリ内のファイル構造に基づいて、自動的にルーティングが設定されます。

**基本的なルール:**

-   **`page.tsx`:** 各ディレクトリ（フォルダ）内に `page.tsx` (または `.js`, `.jsx`) という名前のファイルを作成すると、そのディレクトリのパスに対応するページの UI コンポーネントとして認識されます。
    -   例: `src/app/page.tsx` は、ルートパス (`/`)、つまり `http://localhost:3000/` にアクセスした際に表示されるページになります。
    -   例: `src/app/booking/page.tsx` は、`/booking` パス、つまり `http://localhost:3000/booking/` にアクセスした際に表示されるページになります。
    -   例: `src/app/booking/new/page.tsx` は、`/booking/new` パス、つまり `http://localhost:3000/booking/new/` にアクセスした際に表示されるページになります。

-   **`layout.tsx`:** 各ディレクトリ内に `layout.tsx` という名前のファイルを作成すると、そのディレクトリおよび配下のディレクトリのページで共通して使用されるレイアウトコンポーネントとして認識されます。ヘッダーやフッターなど、共通の UI 要素を配置するのに便利です。
    -   `layout.tsx` は子要素（`page.tsx` や下層の `layout.tsx`）を `children` プロパティとして受け取り、それをレンダリングする必要があります。
    ```tsx
    import type { Metadata } from 'next'

    // メタデータ（ページのタイトルや説明など）を設定
    export const metadata: Metadata = {
      title: '予約カレンダーページ',
      description: 'あしたぼの予約カレンダー',
    }

    // レイアウトコンポーネント
    export default function BookingLayout({
      children, // 子要素を受け取る
    }: {
      children: React.ReactNode
    }) {
      return (
        <section>
          {/* ここに共通のヘッダーなどを配置できる */}
          <nav>共通ナビゲーション</nav>

          {/* 受け取った子要素（ページコンポーネントなど）を表示 */}
          {children}

          {/* ここに共通のフッターなどを配置できる */}
        </section>
      )
    }
    ```
    **注意:** 新しいページを作成する際は、`layout.tsx` も適切に設定する必要があります。通常は既存の `layout.tsx` をコピーし、`metadata` の `title` と `description` をページの内容に合わせて変更すれば良いでしょう。

### App Router のその他の規約

-   **`not-found.tsx`:** ディレクトリ内に `not-found.tsx` を作成すると、そのパスに対応するページが見つからなかった場合（404 エラー）に表示されるカスタム UI を定義できます。
-   **`loading.tsx`:** ディレクトリ内に `loading.tsx` を作成すると、ページのデータ読み込み中に表示されるローディング UI を定義できます。
-   **`error.tsx`:** ディレクトリ内に `error.tsx` を作成すると、ページレンダリング中にエラーが発生した場合に表示されるエラー UI を定義できます。
-   **API Routes:** `src/app/api` ディレクトリ以下にファイルを作成することで、サーバーサイドで動作する API エンドポイントを作成できます。（バックエンド開発に関わる部分です。）

## React コンポーネントの基本構造

React アプリケーションは、「コンポーネント」と呼ばれる独立した UI パーツを組み合わせて構築されます。ここでは、`src/app/page.tsx` を例に、React コンポーネントの基本的な構造を見ていきましょう。

```tsx
'use client' // クライアントコンポーネントであることを示す宣言

import React from 'react' // React ライブラリのインポート
import MainPage from '@/components/BookingMainPage' // 別のコンポーネントをインポート

// Page コンポーネントの定義 (アロー関数形式)
const Page = () => {
  // このコンポーネントがレンダリングする UI を返す
  // ここでは MainPage コンポーネントを呼び出している
  return <MainPage />
}

// このファイルをモジュールとしてインポートした際に、
// デフォルトで Page コンポーネントがエクスポートされるようにする
export default Page
```

**主要な要素:**

1.  **`'use client'` 宣言:**
    ファイルの先頭にあるこの宣言は、このコンポーネントが「クライアントコンポーネント」であることを示します。クライアントコンポーネントはブラウザ上で動作し、`useState` や `useEffect` といった React のフック（後述）を使用してインタラクティブな UI を構築できます。Next.js (App Router) では、デフォルトはサーバーコンポーネントであり、インタラクティブな機能が必要な場合にこの宣言を追加します。
    [参考: React 公式ドキュメント - 'use client'](https://ja.react.dev/reference/react/use-client)

2.  **`import` 文:**
    他のファイルやライブラリから必要な関数、変数、コンポーネントなどを読み込むために使用します。
    ```tsx
    // React ライブラリ本体をインポート
    import React from 'react'
    // 別のファイル (BookingMainPage.tsx) から MainPage コンポーネントをインポート
    // '@/' は src ディレクトリへのエイリアス (パスの短縮表記)
    import MainPage from '@/components/BookingMainPage'
    // react ライブラリから useState, useEffect フックをインポート (名前付きインポート)
    import { useState, useEffect } from 'react'
    // 外部ライブラリ (date-fns) から format 関数をインポート
    import { format } from 'date-fns'
    ```
    -   `import 名前 from 'パス'` : デフォルトエクスポートされたものをインポート
    -   `import { 名前1, 名前2 } from 'パス'` : 名前付きエクスポートされたものをインポート

3.  **コンポーネント関数:**
    React コンポーネントは、UI を返す JavaScript/TypeScript の関数です。関数名は大文字で始めるのが慣習です。
    -   **アロー関数:** `const ComponentName = (props) => { ... }` という形式で定義されることが多いです。
    -   **`return` 文:** コンポーネントが表示する UI を JSX (JavaScript XML) 形式で返します。JSX は HTML に似た構文で、JavaScript の中に UI 構造を記述できます。
        ```tsx
        const MyComponent = () => {
          const message = "Hello, React!";
          return (
            <div> {/* JSX では、通常単一の親要素で囲む */}
              <h1>{message}</h1> {/* JavaScript の変数を埋め込める */}
              <p>This is a simple component.</p>
              <button onClick={() => alert('Clicked!')}>Click Me</button> {/* イベントハンドラも設定可能 */}
            </div>
          );
        }
        ```
        このコンポーネントがブラウザでレンダリングされると、以下のような HTML 構造が生成されます（実際の出力は React の処理やスタイリングによって多少異なります）。

        ```html
        <div>
          <h1>Hello, React!</h1>
          <p>This is a simple component.</p>
          <button>Click Me</button>
        </div>
        ```
        そして、ブラウザ上では以下のように表示されます（画像はあくまで一例です）。
        ![JSX の例](/assets/images/react/image-01.png)

4.  **`export default` 文:**
    そのファイル（モジュール）の主要な機能として、コンポーネント関数を外部から利用できるように公開（エクスポート）します。`page.tsx` や `layout.tsx` では、Next.js が認識するために `export default` が必要です。
    -   **`export` (名前付きエクスポート):** `default` を付けずに `export const MyVariable = ...` や `export function myFunction() { ... }` のようにすると、複数の変数や関数をエクスポートできます。インポートする際は `{ MyVariable, myFunction }` のように波括弧で囲んで指定します。
    -   **`export default` (デフォルトエクスポート):** 1 つのファイルにつき 1 つだけ指定できます。インポートする際は波括弧なしで任意の名前を付けられます（通常はエクスポート名と同じにする）。

    **例 (Popup.tsx):**
    ```tsx
    // 型定義を名前付きエクスポート
    export type PopupRef = { /* ... */ } | undefined;

    // Popup コンポーネントを定義
    const Popup = forwardRef<PopupRef, { /* ... */ }>(({ /* ... */ }, ref) => {
      // ... コンポーネントの実装 ...
      return ( /* JSX */ );
    });

    // Popup コンポーネントをデフォルトエクスポート
    export default Popup;
    ```
    **インポート例 (BookingMainPage.tsx):**
    ```tsx
    // デフォルトエクスポートされた Popup と、名前付きエクスポートされた PopupRef をインポート
    import Popup, { PopupRef } from '@/components/atom/Popup';
    ```

---

これが React コンポーネントの基本的な構造です。次は、React の重要な機能であるフック（`useState`, `useEffect` など）について見ていきましょう。

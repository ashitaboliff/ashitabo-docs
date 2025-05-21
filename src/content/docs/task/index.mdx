---
title: 実践課題:コードを編集してみよう (Docker 開発環境)
---

ここからは、実際にコードを編集しながら、React や関連ライブラリの機能がどのように動作するかを体験してみましょう。

## はじめに: 開発環境の準備と注意点

**1. 開発サーバーの起動:**

この課題では、コードの変更をリアルタイムで確認しながら進めます。まず、VS Code の統合ターミナルで以下のコマンドを実行し、Docker 環境の開発サーバーを起動してください。

```bash
make up
```

（もしコンテナが起動していない場合は、先に `make new` を実行する必要があるかもしれません。）

**2. コード変更時の注意:**

-   **コミット・プッシュはしない:** この課題で行ったコード変更は、練習用です。Git のソース管理タブに変更が表示されますが、**コミットやプッシュは行わないでください。**
-   **変更の破棄:** 課題が一通り終わったら、ソース管理タブにある「変更を破棄」ボタン（回転矢印のようなアイコン）をクリックして、加えた変更を元に戻してください。ただし、各課題の途中で変更を破棄すると、次のステップに進めなくなる可能性があるので注意してください。

**3. 質問やエラーについて:**

課題を進める中で不明な点やエラーが発生した場合は、以下の情報を添えて Discord で質問してください。

-   変更を加えたコードの該当箇所
-   エラーメッセージや現在の画面のスクリーンショット
-   どのような操作を行ったか

Discord で共有することで、他のメンバーも同様の問題解決に役立てることができます。

---

それでは、課題に取り組みましょう！

## 課題1: UI (HTML/JSX) 部分の編集

まずは、画面に表示される要素（HTML に相当する JSX 部分）を編集してみましょう。

### 課題1-1: 「使い方の表示」の内容変更

あしたぼコマ表のトップページにある「使い方の表示」ボタンをクリックすると、モーダルウィンドウで使い方の説明が表示されます。この説明文の内容を編集してみましょう。

-   **対象ファイル:** `src/components/BookingMainPage.tsx` （または関連するコンポーネント）内にある、説明文が記述されている箇所を探してください。
-   **編集内容:** 自由に内容を変更してみてください。改行 (`<br />` タグや複数行の文字列) や、簡単な装飾（太字など Markdown 記法が使える場合もあります）を試してみましょう。

### 課題1-2: ボタンのクリック動作変更

現在、「使い方の表示」ボタンはクリックするとモーダルウィンドウを開きます。このボタンの動作を、クリックしたら新規予約ページ (`/booking/new`) に遷移するように変更してみましょう。

-   **対象コード:** `src/components/BookingMainPage.tsx` 内にある「使い方の表示」ボタンのコードを探します。以下のような記述になっているはずです。
    ```tsx
    <Button variant="outlined" color="inherit" onClick={() => setIsPopupOpen(true)}>
      使い方の表示
    </Button>
    ```
    このコードは、MUI の Button コンポーネントを使用して、「使い方の表示」というテキストを持つボタンをレンダリングします。
    - `variant="outlined"`: ボタンの見た目をアウトラインスタイルにします。
    - `color="inherit"`: 親要素の色を継承します。
    - `onClick`: ボタンがクリックされたときに実行される関数を指定します。この例では `setIsPopupOpen(true)` という関数（状態更新関数と推測されます）を呼び出しています。

    実際にブラウザで表示される際には、MUI のスタイルが適用されたボタン要素（通常は HTML の `<button>` タグ）としてレンダリングされます。

-   **変更箇所:** `onClick` プロパティに設定されている関数（アロー関数 `() => setIsPopupOpen(true)`）を、ページ遷移を行う処理に変更します。
-   **ヒント:** ページ遷移には Next.js の `useRouter` フックを使用します。
    1.  `BookingMainPage.tsx` の先頭付近で `useRouter` をインポートします。
        ```tsx
        import { useRouter } from 'next/navigation';
        ```
    2.  コンポーネント関数の内部で `useRouter` を呼び出し、`router` オブジェクトを取得します。
        ```tsx
        const MainPage = () => {
          const router = useRouter(); // router オブジェクトを取得
          // ... 他のコード ...
        }
        ```
    3.  `router` オブジェクトには `push` というメソッドがあり、引数に遷移先のパスを指定することでページ遷移を実行できます (`router.push('/booking/new')`)。このメソッドを `onClick` の処理として設定します。

    他のコンポーネントで `useRouter` がどのように使われているか、VS Code の検索機能（虫眼鏡アイコン）で `useRouter` を検索して参考にしてみるのも良いでしょう。
    [参考: Next.js 公式ドキュメント - useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router) (App Router 版)

### 課題1-3: 新しいボタンの追加

「使い方の表示」ボタンの動作を元に戻した上で、その下に「新規予約」ボタンを新しく追加し、クリックすると `/booking/new` に遷移するように実装してみましょう。

-   **目標:**
    ![ボタン追加例1](/assets/images/task/image-01.png)
    （縦に並べるのが難しい場合は、下の画像のように横並びでも構いません。）
    ![ボタン追加例2](/assets/images/task/image-02.png)
-   **要件:**
    -   ボタンのテキストは「新規予約」。
    -   クリックすると `/booking/new` に遷移する。
    -   ボタンの色は青色（primary color）に設定する。
-   **ヒント:**
    -   ボタンの追加には MUI の `<Button>` コンポーネントを使用します。
    -   ボタンを縦または横に並べるには、MUI の `<Stack>` コンポーネントが便利です。
    -   ボタンの色や見た目（variant）は `<Button>` の props で設定できます。
    [参考: MUI Button ドキュメント](https://mui.com/material-ui/react-button/)
    [参考: MUI Stack ドキュメント](https://mui.com/material-ui/react-stack/)

### 課題1-4: ヘッダーの編集

ページ上部にあるヘッダー（「あしたぼコマ表」と表示されている部分）のデザインを変更してみましょう。

-   **変更内容:**
    -   ヘッダーの背景色を緑色系の色に変更する。
    -   表示されているテキストを好きな文言に変更する。
-   **ヒント:**
    -   ヘッダーは共通レイアウトの一部として定義されている可能性が高いです。`src/app/layout.tsx` や、関連するレイアウトコンポーネントを確認してみましょう。
    -   ヘッダーの実装には MUI の `<AppBar>` コンポーネントが使われている可能性があります。
    -   テキストの表示には MUI の `<Typography>` コンポーネントが使われている可能性があります。
    -   色の指定方法は MUI のドキュメントを参照してください。
    ![関係ない画像](/assets/images/task/image-03.png)
    [参考: MUI AppBar ドキュメント](https://mui.com/material-ui/react-app-bar/)
    [参考: MUI Typography ドキュメント](https://mui.com/material-ui/react-typography/)

---

## 課題2: React の主要機能を使ってみよう

ここからは、React の中核機能である「フック」を使って、コンポーネントの状態管理や副作用の処理を実装してみましょう。

### 課題2-1: `useState` フックによる状態管理

`useState` は、コンポーネント内で時間とともに変化する値（状態）を管理するためのフックです。

**基本的な使い方:**

```tsx
import { useState } from 'react'; // useState をインポート

const MyComponent = () => {
  // useState を呼び出し、状態変数 (state) と更新関数 (setState) を受け取る
  // <number> は状態の型、(0) は初期値
  const [count, setCount] = useState<number>(0);

  // ボタンがクリックされたときに呼ばれる関数
  const handleClick = () => {
    // 更新関数 (setCount) を使って状態を更新する
    setCount(count + 1); // 現在の count に 1 を加えた値で更新
  };

  return (
    <div>
      <p>現在のカウント: {count}</p> {/* 状態変数 (count) を表示 */}
      <button onClick={handleClick}>カウントアップ</button>
    </div>
  );
}
```
この `MyComponent` がレンダリングされると、初期状態では「現在のカウント: 0」というテキストと「カウントアップ」ボタンが表示されます。
ボタンをクリックするたびに `handleClick` 関数が呼ばれ、`setCount(count + 1)` によって `count` の状態が更新されます。
React は状態の変更を検知し、コンポーネントを再レンダリングするため、画面上のカウント表示も更新されます。

生成される HTML のイメージ（`count` が `0` の場合）:
```html
<div>
  <p>現在のカウント: 0</p>
  <button>カウントアップ</button>
</div>
```

-   `useState(初期値)`: 状態を初期化し、`[状態変数, 更新関数]` のペア（配列）を返します。
-   **状態変数:** 現在の状態の値を保持します。（例: `count`）
-   **更新関数:** 状態変数の値を更新するために呼び出す関数です。（例: `setCount`）この関数を呼び出すと、React はコンポーネントを再レンダリングし、画面に変更を反映します。

[参考: React 公式ドキュメント - useState](https://ja.react.dev/reference/react/useState)
[参考: useState の解説記事 (Qiita)](https://qiita.com/KokiSakano/items/c16a8daf03acdbd6c911)

**課題:**

`src/components/BookingMainPage.tsx` に以下の機能を追加してください。

1.  **新しい状態の追加:** 真偽値 (`boolean`) を管理する `useState` を新たに追加します。（例: `const [isToggled, setIsToggled] = useState<boolean>(false);`）
2.  **Switch コンポーネントの追加:** MUI の `<Switch>` コンポーネントを追加し、このスイッチを操作すると、上記で追加した状態 (`isToggled`) が `true`/`false` で切り替わるようにします。
3.  **画像の条件付き表示:** `isToggled` の状態が `true` のとき、ページに表示されている2つの画像のうち、片方（どちらでも良い）が、もう片方と同じ画像になるように変更してください。（`false` のときは元の2つの異なる画像が表示されるようにします。）

**完成イメージ:** (GIF アニメーション)
![useState 課題イメージ](/assets/images/task/video-to-gif-01.gif)

**ヒント:**

-   `<Switch>` の状態変化を捉えるには `onChange` プロパティを使用します。
-   JSX の中で条件によって表示する内容を変えるには、三項演算子 (`condition ? value_if_true : value_if_false`) や論理 AND 演算子 (`condition && value_if_true`) などが使えます。
[参考: MUI Switch ドキュメント](https://mui.com/material-ui/react-switch/)
[参考: React における条件分岐レンダリング (Zenn)](https://zenn.dev/tarou_yuruyuru/articles/41194caa645937)

### 課題2-2: `useEffect` フックによる副作用の実行

`useEffect` は、コンポーネントのレンダリング後や、特定の状態が変化した後に、何らかの処理（副作用）を実行するためのフックです。データの取得、DOM の直接操作、タイマーの設定などに使われます。

**基本的な使い方:**

```tsx
import { useState, useEffect } from 'react'; // useEffect をインポート

const MyComponent = () => {
  const [count, setCount] = useState<number>(0);

  // useEffect を定義
  useEffect(() => {
    // この中の処理が実行される
    console.log(`カウントが ${count} になりました`);

    // クリーンアップ関数 (任意): コンポーネントがアンマウントされる際や、
    // 次の useEffect が実行される前に実行される
    return () => {
      console.log('useEffect のクリーンアップ');
    };
  }, [count]); // 第2引数 (依存配列): ここに指定した値が変化した時だけ useEffect が実行される

  // count が変化しない限り、この useEffect は初回レンダリング後のみ実行される
  useEffect(() => {
    console.log('コンポーネントがマウントされました');
  }, []); // 依存配列が空の場合

  return (
    <div>
      <p>現在のカウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>カウントアップ</button>
    </div>
  );
}
```
この `MyComponent` では、2つの `useEffect` が使用されています。
- 1つ目の `useEffect` は、`count` 状態が変化するたびに実行され、コンソールに現在のカウント値をログ出力します。また、クリーンアップ関数が定義されており、`count` が変化して次の `useEffect` が実行される前、またはコンポーネントがアンマウントされる際に「useEffect のクリーンアップ」というログを出力します。
- 2つ目の `useEffect` は、依存配列が空 (`[]`) なので、コンポーネントが最初にマウントされた（画面に表示された）後に一度だけ実行され、「コンポーネントがマウントされました」というログを出力します。

このコンポーネントが表示され、ボタンがクリックされると、以下のような流れでコンソールにログが出力されます（初回レンダリング時）。
1. `コンポーネントがマウントされました`
2. `カウントが 0 になりました`
ボタンをクリックして `count` が `1` になると:
3. `useEffect のクリーンアップ` (前の `count` が `0` の時の `useEffect` のクリーンアップ)
4. `カウントが 1 になりました`

-   `useEffect(実行したい関数, [依存配列])`:
    -   **実行したい関数:** レンダリング後や依存配列の値が変化した後に実行される処理を記述します。
    -   **依存配列:** この配列に含まれる値（状態変数や props など）が変化したときに、第一引数の関数が再実行されます。
        -   配列が空 (`[]`) の場合、コンポーネントの初回レンダリング後にのみ実行されます。
        -   配列を省略した場合、毎回のレンダリング後に実行されます（通常は避けるべき）。

**課題:**

`src/components/BookingMainPage.tsx` に以下の機能を追加してください。

1.  **新しい `useEffect` の追加:** 既存の `useEffect` とは別に、新しい `useEffect` を追加します。
2.  **コンソールログの出力:** 「カレンダーを更新」ボタンがクリックされ、予約情報 (`bookings` 状態) が更新された **後** に、ブラウザのコンソールに「予約が更新されました」というメッセージが出力されるように実装してください。
    -   `bookings` 状態が `useEffect` の依存配列に含まれるようにします。
    -   コンソールへの出力方法は `console.log('メッセージ')` です。ブラウザの開発者ツール（F12 キーなどで開く）の Console タブで確認できます。
    [参考: console.log の使い方](https://www.flavor-of-life.com/entry/how_to_javascript_console_log)

**完成イメージ:** (GIF アニメーション)
![useEffect 課題イメージ](/assets/images/task/video-to-gif-02.gif)
（GIF ではアラートを表示していますが、課題ではコンソールログ出力で実装してください。）

### 課題2-3: `useState` と `useEffect` の連携

`useState` で管理している状態の変化を `useEffect` で検知し、別の状態を更新するという連携パターンを試してみましょう。

**課題:**

課題 2-1 で実装した「画像の条件付き表示」を、`useEffect` を使って実現するように変更します。

1.  **画像ソース用の状態追加:** 画像の `src` 属性値を管理するための新しい `useState` を追加します。型と初期値を適切に設定してください。
    ```tsx
    // 例: orImage の型と初期値を設定する (適切な型と初期値に置き換える)
    const [orImageSrc, setOrImageSrc] = useState<string>('/initial_image.png');
    ```
2.  **Image タグの修正:** 画像を表示している `<Image>` タグの `src` 属性が、上記で作成した新しい状態変数 (`orImageSrc`) を参照するように変更します。
    ```tsx
    <Stack spacing={8} direction="row" className="flex justify-center">
      <Image
        src={orImageSrc} // 新しい状態変数を参照
        alt="logo"
        width={150}
        height={120}
      />
      <Image src="/animal_dance.png" alt="logo" width={150} height={120} />
    </Stack>
    ```
3.  **`useEffect` の実装:** 課題 2-1 で追加した Switch の状態 (`isToggled`) が変化したことを検知する `useEffect` を実装します。
4.  **状態の更新:** この `useEffect` の中で、`isToggled` の値に応じて `setOrImageSrc` を呼び出し、表示する画像のパス (`/animal_dance.png` または元の画像のパス) で `orImageSrc` 状態を更新するようにします。

これにより、Switch が操作される (`isToggled` が変化) -> `useEffect` が実行される -> `orImageSrc` が更新される -> 画像が切り替わる、という流れが実現できます。

---

## 課題3: React Hook Form によるフォーム作成

React Hook Form は、React でフォームを扱うための人気のライブラリです。入力値の管理、バリデーション、送信処理などを効率的に実装できます。

### 課題3-1: 新しいテストページの作成

まず、フォーム作成の練習用に新しいページとコンポーネントを作成しましょう。

1.  **フォルダ作成:** `src/app/booking/` ディレクトリ内に `test` という名前の新しいフォルダを作成します。
2.  **ファイル作成:** 作成した `test` フォルダ内に `page.tsx` と `layout.tsx` を作成します。内容は既存のページ（例: `src/app/booking/new/` 内のファイル）をコピーして、`layout.tsx` の `metadata` を適切に変更すれば OK です。
3.  **コンポーネント作成:** `src/components/` ディレクトリ内に `TestForm.tsx` (または任意の名前) という新しいファイルを作成します。
4.  **コンポーネント実装:** `TestForm.tsx` に、MUI の `<Typography>` コンポーネントを使って「テスト用予約ページ」という見出し (`h6` 相当、中央揃え) を表示する簡単なコンポーネントを実装します。
5.  **ページでの読み込み:** `src/app/booking/test/page.tsx` で、作成した `TestForm.tsx` コンポーネントをインポートし、表示するように実装します。
6.  **表示確認:** ブラウザで `http://localhost:3000/booking/test` にアクセスし、以下のように表示されれば成功です。
    ![テストページ表示確認](/assets/images/task/image-04.png)

**ヒント:**

-   コンポーネントの基本的な作り方は「React の基礎」ドキュメントを参照してください。
-   中央揃えは `<Typography>` の `align` プロパティや、親要素のスタイリング (例: Tailwind CSS の `text-center`) で実現できます。
[参考: MUI Typography ドキュメント](https://mui.com/material-ui/api/typography/)

### 課題3-2: 簡単なフォームの実装 (React Hook Form)

作成したテストページ (`TestForm.tsx`) に、React Hook Form を使って簡単な入力フォームを追加してみましょう。（この課題の詳細は、必要に応じて別途指示します。）

---

## 課題4: バックエンド開発 (任意)

（バックエンド開発に関する課題は、必要に応じて別途指示します。）

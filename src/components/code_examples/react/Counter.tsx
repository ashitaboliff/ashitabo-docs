'use client'; // useStateを使うのでクライアントコンポーネント

import React, { useState } from 'react';

function Counter() {
  // 'count' という名前のState変数を宣言。初期値は0。
  // 'setCount' は 'count' を更新するための関数。
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // countの値を1増やす
  }

  return (
    <div>
      <p
        className='tw:text-lg tw:font-bold tw:mb-4'
      >
        現在のカウント: {count}
      </p>
      <button 
        className='tw:btn tw:btn-primary tw:mb-4'
        onClick={handleClick}
      >
        カウントアップ
      </button>
    </div>
  );
}
export default Counter;

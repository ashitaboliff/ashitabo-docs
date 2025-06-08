// src/components/InteractiveButton.tsx
'use client'; // クライアントコンポーネント宣言

import { useState } from 'react';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)} className="btn btn-accent mt-4">
      クリック回数: {count}
    </button>
  );
}

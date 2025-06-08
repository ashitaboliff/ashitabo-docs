'use client'; // windowオブジェクトを使うのでクライアントサイド限定
import { useState, useEffect } from 'react';

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // 初期サイズを取得

    return () => window.removeEventListener('resize', handleResize); // クリーンアップ
  }, []); // 空の依存配列で初回マウント時のみ実行

  return windowSize;
}

export default useWindowSize;

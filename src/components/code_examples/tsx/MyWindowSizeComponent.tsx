// MyComponent.tsx
'use client';
import useWindowSize from './useWindowSize'; // パスは適宜調整 (この例では同じディレクトリを想定)

function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <p>
      ウィンドウ幅: {width !== undefined ? `${width}px` : '測定中...'}, 高さ: {height !== undefined ? `${height}px` : '測定中...'}
    </p>
  );
}
export default MyComponent;

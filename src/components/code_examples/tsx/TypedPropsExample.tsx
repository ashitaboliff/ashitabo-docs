import React from 'react';

type HelloProps = { name: string };
function Hello({ name }: HelloProps) {
  return <h1>こんにちは、{name}さん！</h1>;
}

// 使用例 (実際には別のコンポーネントでこのように使います)
// const App = () => {
//   return <Hello name="たろう" />;
// }

export default Hello; // 主なコンポーネントをエクスポート

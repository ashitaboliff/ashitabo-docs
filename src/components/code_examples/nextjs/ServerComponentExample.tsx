// src/app/my-server-page/page.tsx
// (デフォルトでサーバーコンポーネント)

// import InteractiveButton from '@/components/InteractiveButton'; // 実際のプロジェクトではパスを調整

// ダミーのInteractiveButtonコンポーネント
const InteractiveButton = () => <button>Dummy Interactive Button</button>;

async function fetchData() {
  // const res = await fetch('https://api.example.com/data', { cache: 'no-store' });
  // if (!res.ok) throw new Error('Failed to fetch');
  // return res.json();
  console.log("Fetching data on server (dummy)...");
  await new Promise(resolve => setTimeout(resolve, 300));
  return { message: "サーバーからのデータです！" };
}

export default async function MyServerPage() {
  const data = await fetchData(); // サーバーサイドでデータを取得

  return (
    <div>
      <h1>サーバーから取得したデータ</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* ここにクライアントコンポーネントを配置することも可能 */}
      <InteractiveButton />
    </div>
  );
}

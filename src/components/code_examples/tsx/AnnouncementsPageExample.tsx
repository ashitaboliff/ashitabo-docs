// import Link from 'next/link';

// ダミーのLinkコンポーネント (型エラー回避のため)
const Link = ({ href, children, ...props }: { href: string, children: React.ReactNode, [key: string]: any }) => <a href={href} {...props}>{children}</a>;

async function getAnnouncements() {
  // 開発環境では 'http://localhost:3000' など、環境に応じてURLを調整
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/announcements`, {
  //   cache: 'no-store', // キャッシュせずに常に最新を取得
  // });
  // if (!res.ok) {
  //   throw new Error('お知らせの取得に失敗しました');
  // }
  // return res.json();

  // ダミーデータ
  console.log("Fetching announcements (dummy)...");
  await new Promise(resolve => setTimeout(resolve, 200)); // 擬似的な遅延
  return [
    { id: 1, title: "最初のお知らせ", content: "これは最初のお知らせの本文です。", createdAt: new Date().toISOString() },
    { id: 2, title: "次のお知らせ", content: "これは次のお知らせの本文です。", createdAt: new Date(Date.now() - 86400000).toISOString() }, // 1日前
  ];
}

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div>
      <h1>お知らせ一覧</h1>
      <Link href="/announcements/new" className="btn btn-primary mb-4">
        新しいお知らせを作成
      </Link>
      {announcements.length === 0 ? (
        <p>お知らせはありません。</p>
      ) : (
        <ul>
          {announcements.map((announcement: any) => ( // 型は適宜定義
            <li key={announcement.id} className="mb-2 border p-2 rounded">
              <Link href={`/announcements/${announcement.id}`}>
                <h2 className="text-xl font-bold">{announcement.title}</h2>
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(announcement.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

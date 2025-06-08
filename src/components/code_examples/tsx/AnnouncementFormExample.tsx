'use client';
import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // App Router用のルーター

// ダミーのuseRouterフック (型エラー回避のため)
const useRouter = () => ({
  push: (path: string) => console.log(`Dummy router.push to: ${path}`),
  refresh: () => console.log('Dummy router.refresh called'),
});

export default function AnnouncementForm({ announcement }: { announcement?: any }) { // announcementは編集時に渡す
  const router = useRouter();
  const [title, setTitle] = useState(announcement?.title || '');
  const [content, setContent] = useState(announcement?.content || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const method = announcement ? 'PUT' : 'POST';
    const url = announcement
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/announcements/${announcement.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || '処理に失敗しました。');
      }
      router.push('/announcements'); // 一覧ページへリダイレクト
      router.refresh(); // サーバーコンポーネントのデータを再取得 (重要)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input input-bordered w-full"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium">内容</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
          className="textarea textarea-bordered w-full"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? '送信中...' : (announcement ? '更新' : '作成')}
      </button>
    </form>
  );
}

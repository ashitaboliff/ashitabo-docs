import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // 実際のプロジェクトではパスを調整してください

// ダミーのprismaオブジェクト
const prisma = {
  announcement: {
    findMany: async (options: any) => {
      console.log("prisma.announcement.findMany called with:", options);
      return [{ id: 1, title: "Dummy Announcement 1", content: "Content 1", createdAt: new Date() }];
    },
  },
};

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        createdAt: 'desc', // 作成日時の新しい順
      },
    });
    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({ error: 'お知らせの取得に失敗しました。' }, { status: 500 });
  }
}

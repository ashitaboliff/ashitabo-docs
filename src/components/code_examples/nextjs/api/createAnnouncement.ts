import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma'; // 実際のプロジェクトではパスを調整してください

// ダミーのprismaオブジェクト
const prisma = {
  announcement: {
    create: async (options: any) => {
      console.log("prisma.announcement.create called with:", options);
      return { id: 2, ...options.data, createdAt: new Date(), updatedAt: new Date() };
    },
  },
};

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'タイトルと内容は必須です。' }, { status: 400 });
    }

    const newAnnouncement = await prisma.announcement.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newAnnouncement, { status: 201 });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: 'お知らせの作成に失敗しました。' }, { status: 500 });
  }
}

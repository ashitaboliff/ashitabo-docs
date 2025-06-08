// pages/api/users.ts (Next.js APIルートの例)
// import prisma from '@/lib/prisma'; // 実際のプロジェクトではパスを調整してください

// ダミーのprismaオブジェクト（型チェックとコード補完のため）
const prisma = {
  user: {
    create: async (options: any) => {
      console.log("prisma.user.create called with:", options);
      return {
        id: 'dummy-user-id',
        email: options.data.email,
        name: options.data.name,
        posts: options.data.posts.create.map((post: any, index: number) => ({
          id: `dummy-post-id-${index}`,
          ...post,
        })),
        ...options.data,
      };
    },
  },
};


async function createUser() {
  const newUser = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      posts: {
        create: [
          { title: '初めての投稿', content: 'こんにちは！' },
          { title: 'Prismaは便利', published: true },
        ],
      },
    },
    include: { // 作成と同時にリレーション先のデータも取得
      posts: true,
    },
  });
  console.log(newUser);
}

// createUser(); // 実行例（ドキュメント表示時には不要）

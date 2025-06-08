// src/app/actions.ts (または任意の場所)
'use server'; // このファイル内の関数はサーバーアクションとして扱える

// import prisma from '@/lib/prisma'; // 実際のプロジェクトでは有効化
// import { revalidatePath } from 'next/cache';

// ダミーのrevalidatePath関数 (型エラー回避のため)
const revalidatePath = (path: string) => console.log(`Dummy revalidatePath called for: ${path}`);

// ダミーのprismaオブジェクト
const prisma = {
  todo: {
    create: async (options: any) => { console.log('prisma.todo.create called', options); return { id: 1, ...options.data }; },
    update: async (options: any) => { console.log('prisma.todo.update called', options); return { id: options.where.id, ...options.data }; },
  }
};

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title) {
    return { error: 'タイトルは必須です。' };
  }
  try {
    await prisma.todo.create({ data: { title } });
    revalidatePath('/todos'); // /todosページのキャッシュを更新
    return { success: true };
  } catch (e) {
    return { error: 'Todoの作成に失敗しました。' };
  }
}

export async function toggleTodo(id: number, completed: boolean) {
  try {
    await prisma.todo.update({ where: { id }, data: { completed } });
    revalidatePath('/todos');
    return { success: true };
  } catch (e) {
    return { error: 'Todoの更新に失敗しました。' };
  }
}

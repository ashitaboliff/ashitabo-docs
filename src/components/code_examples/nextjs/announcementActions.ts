// src/features/announcement/lib/actions.ts (または components/actions.ts)
'use server';

// import {
//   getAllAnnouncementsFromDb,
//   getAnnouncementByIdFromDb,
//   createAnnouncementInDb,
//   updateAnnouncementInDb,
//   deleteAnnouncementFromDb,
// } from './repository'; // 実際のリポジトリパス
// import { revalidateTag, revalidatePath } from 'next/cache';
// import type { Announcement } from '../types'; // 型定義
// import type { ApiResponse } from '@/utils/types/responseTypes'; // 共通レスポンス型
// import { StatusCode } from '@/utils/types/responseTypes';

// ダミーのインポートと型
const getAllAnnouncementsFromDb = async () => [{ id: 1, title: "DB Ann 1", content: "DB Content 1", createdAt: new Date(), updatedAt: new Date() }];
const getAnnouncementByIdFromDb = async (id: number) => id === 1 ? { id: 1, title: "DB Ann 1", content: "DB Content 1", createdAt: new Date(), updatedAt: new Date() } : null;
const createAnnouncementInDb = async (data: any) => ({ id: Date.now(), ...data, createdAt: new Date(), updatedAt: new Date() });
const updateAnnouncementInDb = async (id: number, data: any) => ({ id, ...data, updatedAt: new Date() });
const deleteAnnouncementFromDb = async (id: number) => ({ id });
const revalidateTag = async (tag: string) => console.log(`Dummy revalidateTag: ${tag}`);
const revalidatePath = (path: string) => console.log(`Dummy revalidatePath: ${path}`);
type Announcement = { id: number; title: string; content: string; createdAt: Date; updatedAt: Date; };
type ApiResponse<T> = { status: number; message?: string; response?: T | string; error?: string };
const StatusCode = { OK: 200, CREATED: 201, NO_CONTENT: 204, BAD_REQUEST: 400, NOT_FOUND: 404, INTERNAL_SERVER_ERROR: 500 };


export async function getAllAnnouncementsAction(): Promise<ApiResponse<Announcement[]>> {
  try {
    const announcements = await getAllAnnouncementsFromDb();
    return { status: StatusCode.OK, response: announcements };
  } catch (error: any) {
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error: error.message || 'お知らせの取得に失敗しました。' };
  }
}

export async function getAnnouncementByIdAction(id: number): Promise<ApiResponse<Announcement | null>> {
  if (isNaN(id) || id <= 0) {
    return { status: StatusCode.BAD_REQUEST, error: '無効なIDです。' };
  }
  try {
    const announcement = await getAnnouncementByIdFromDb(id);
    if (!announcement) {
      return { status: StatusCode.NOT_FOUND, error: 'お知らせが見つかりません。' };
    }
    return { status: StatusCode.OK, response: announcement };
  } catch (error: any) {
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error: error.message || 'お知らせ詳細の取得に失敗しました。' };
  }
}

export async function createAnnouncementAction(formData: FormData): Promise<ApiResponse<Announcement>> {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { status: StatusCode.BAD_REQUEST, error: 'タイトルと内容は必須です。' };
  }

  try {
    const newAnnouncement = await createAnnouncementInDb({ title, content });
    revalidateTag('announcements'); // お知らせ一覧のキャッシュを無効化
    revalidatePath('/announcements'); // お知らせ一覧ページのパスを再検証
    return { status: StatusCode.CREATED, response: newAnnouncement, message: 'お知らせを作成しました。' };
  } catch (error: any) {
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error: error.message || 'お知らせの作成に失敗しました。' };
  }
}

export async function updateAnnouncementAction(id: number, formData: FormData): Promise<ApiResponse<Announcement>> {
  if (isNaN(id) || id <= 0) {
    return { status: StatusCode.BAD_REQUEST, error: '無効なIDです。' };
  }
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    return { status: StatusCode.BAD_REQUEST, error: 'タイトルと内容は必須です。' };
  }

  try {
    const updatedAnnouncement = await updateAnnouncementInDb(id, { title, content });
    revalidateTag('announcements');
    revalidateTag(`announcement:${id}`);
    revalidatePath('/announcements');
    revalidatePath(`/announcements/${id}`);
    return { status: StatusCode.OK, response: updatedAnnouncement, message: 'お知らせを更新しました。' };
  } catch (error: any) {
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error: error.message || 'お知らせの更新に失敗しました。' };
  }
}

export async function deleteAnnouncementAction(id: number): Promise<ApiResponse<null>> {
  if (isNaN(id) || id <= 0) {
    return { status: StatusCode.BAD_REQUEST, error: '無効なIDです。' };
  }
  try {
    await deleteAnnouncementFromDb(id);
    revalidateTag('announcements');
    revalidateTag(`announcement:${id}`); // 個別記事のキャッシュも考慮
    revalidatePath('/announcements');
    revalidatePath(`/announcements/${id}`); // 詳細ページも再検証
    return { status: StatusCode.NO_CONTENT, message: 'お知らせを削除しました。' };
  } catch (error: any) {
    return { status: StatusCode.INTERNAL_SERVER_ERROR, error: error.message || 'お知らせの削除に失敗しました。' };
  }
}

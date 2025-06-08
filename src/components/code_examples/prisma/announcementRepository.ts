// src/features/announcement/lib/repository.ts
'use server'; // または 'server-only' を使用

// import prisma from '@/lib/prisma'; // 実際のPrisma Clientインスタンス
// import { unstable_cache } from 'next/cache';
// import type { Announcement } from '../types'; // 型定義ファイルがある場合

// ダミーのprismaとunstable_cache、型
const prisma = {
  announcement: {
    findMany: async (options?: any) => {
      console.log("prisma.announcement.findMany called with:", options);
      return [{ id: 1, title: "Dummy Repo Announcement 1", content: "Content 1", createdAt: new Date(), updatedAt: new Date() }];
    },
    findUnique: async (options: any) => {
      console.log("prisma.announcement.findUnique called with:", options);
      if (options.where.id === 1) {
        return { id: 1, title: "Dummy Repo Announcement 1", content: "Content 1", createdAt: new Date(), updatedAt: new Date() };
      }
      return null;
    },
    create: async (options: any) => {
      console.log("prisma.announcement.create called with:", options);
      return { id: Date.now(), ...options.data, createdAt: new Date(), updatedAt: new Date() };
    },
    update: async (options: any) => {
      console.log("prisma.announcement.update called with:", options);
      return { ...options.where, ...options.data, updatedAt: new Date() };
    },
    delete: async (options: any) => {
      console.log("prisma.announcement.delete called with:", options);
      return { ...options.where };
    },
  }
};
const unstable_cache = (fn: (...args: any[]) => Promise<any>, keys: any[], opts: any) => {
  console.log(`unstable_cache called for keys: ${keys.join(',')}, tags: ${opts.tags?.join(',')}`);
  // 元の関数を実行する非同期関数を返す（キャッシュの挙動を模倣）
  return async (...args: any[]) => {
    return fn(...args);
  };
};
type Announcement = { id: number; title: string; content: string; createdAt: Date; updatedAt: Date; };


export const getAllAnnouncementsFromDb = async (): Promise<Announcement[]> => {
  async function fetchAnnouncements() {
    try {
      const announcements = await prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return announcements;
    } catch (error) {
      console.error("Error in fetchAnnouncements:", error);
      throw new Error("データベースからお知らせの取得に失敗しました。");
    }
  }
  const cachedFetchAnnouncements = unstable_cache(
    fetchAnnouncements,
    ['all-announcements'],
    { tags: ['announcements'] }
  );
  return await cachedFetchAnnouncements();
};

export const getAnnouncementByIdFromDb = async (id: number): Promise<Announcement | null> => {
  async function fetchAnnouncement() {
    try {
      const announcement = await prisma.announcement.findUnique({
        where: { id },
      });
      return announcement;
    } catch (error) {
      console.error(`Error fetching announcement with id ${id}:`, error);
      throw new Error("データベースからお知らせ詳細の取得に失敗しました。");
    }
  }
  const cachedFetchAnnouncement = unstable_cache(
    fetchAnnouncement,
    [`announcement-${id}`],
    { tags: [`announcements`, `announcement:${id}`] }
  );
  return await cachedFetchAnnouncement();
};

export const createAnnouncementInDb = async (data: { title: string; content: string }): Promise<Announcement> => {
  try {
    const newAnnouncement = await prisma.announcement.create({
      data,
    });
    return newAnnouncement;
  } catch (error) {
    console.error("Error creating announcement in DB:", error);
    throw new Error("データベースへのお知らせ作成に失敗しました。");
  }
};

export const updateAnnouncementInDb = async (id: number, data: { title?: string; content?: string }): Promise<Announcement> => {
  try {
    const updatedAnnouncement = await prisma.announcement.update({
      where: { id },
      data,
    });
    return updatedAnnouncement;
  } catch (error) {
    console.error(`Error updating announcement ${id} in DB:`, error);
    throw new Error("データベースでのお知らせ更新に失敗しました。");
  }
};

export const deleteAnnouncementFromDb = async (id: number): Promise<Announcement> => {
  try {
    const deletedAnnouncement = await prisma.announcement.delete({
      where: { id },
    });
    return deletedAnnouncement;
  } catch (error) {
    console.error(`Error deleting announcement ${id} in DB:`, error);
    throw new Error("データベースからのお知らせ削除に失敗しました。");
  }
};

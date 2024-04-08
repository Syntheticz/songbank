"use server";

import { PrismaClient, Song } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchSongs(take: number): Promise<Song[]> {
  const res = await prisma.song.findMany({
    take: take,
  });
  await prisma.$disconnect();
  return res;
}

export async function querySongs(take: number, query: string): Promise<Song[]> {
  const songs = await prisma.song.findMany({
    take: take,
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { lyrics: { contains: query, mode: "insensitive" } },
        { artist: { contains: query, mode: "insensitive" } },
        { tags: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  return songs;
}

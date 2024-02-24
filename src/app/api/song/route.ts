import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Song } from "@prisma/client";

const prisma = new PrismaClient();

const res = NextResponse;

export async function GET(req: Request) {
  const songs = await prisma.song.findMany({
    orderBy: { title: "asc" },
    select: {
      id: true,
      artist: true,
      title: true,
      lyrics: true,
      lineupDate: true,
      linupType: true,
    },
  });

  return res.json(songs);
}

export async function POST(req: Request) {
  const {
    artist,
    category,
    lyrics,
    title,
    type,
    votes,
    tags,
    referenceLink,
  }: Song = await req.json();

  const song = await prisma.song.create({
    data: {
      artist: artist,
      category: category,
      lyrics: lyrics,
      title: title,
      type: type,
      votes: votes,
      lineupDate: null,
      createdAt: new Date(Date.now()),
      linupType: null,
      updatedAt: new Date(Date.now()),
      tags: tags,
      referenceLink: referenceLink,
    },
  });

  return res.json(song);
}

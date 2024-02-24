import { NextRequest, NextResponse } from "next/server";

import { PrismaClient, Song } from "@prisma/client";
const prisma = new PrismaClient();

const res = NextResponse;

export async function GET(req: Request, route: { params: { id: string } }) {
  const song = await prisma.song.findUnique({
    where: { id: route.params.id },
  });

  return res.json(song);
}

export async function POST(req: Request, route: { params: { id: string } }) {
  const { artist, category, lyrics, title, type, referenceLink, tags }: Song =
    await req.json();

  const song = await prisma.song.update({
    where: { id: route.params.id },
    data: {
      artist: artist,
      category: category,
      lyrics: lyrics,
      title: title,
      type: type,
      referenceLink: referenceLink,
      tags: tags,
    },
  });

  return res.json(song);
}

export async function PUT(req: Request, route: { params: { id: string } }) {
  const { lineupDate, lineupType, removal } = await req.json();

  let song: Song;

  if (!removal) {
    song = await prisma.song.update({
      where: { id: route.params.id },
      data: {
        lineupDate: lineupDate,
        linupType: lineupType,
        updatedAt: new Date(Date.now()),
      },
    });
  } else {
    song = await prisma.song.update({
      where: { id: route.params.id },
      data: {
        linupType: null,
        lineupDate: null,
      },
    });
  }

  return res.json(song);
}

export async function DELETE(req: Request, route: { params: { id: string } }) {
  const song = await prisma.song.delete({
    where: { id: route.params.id },
  });

  return res.json({ song });
}

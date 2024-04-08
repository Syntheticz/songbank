"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Category from "@/components/Category";
import LineupCard from "@/components/LineupCard";
import Footer from "@/components/Footer";

import SongCard from "@/components/SongCard";
import { Song } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { isUserStored } from "@/lib/serverHelper";

export const dynamic = "force-dynamic";

const currentDate = new Date();
const daysUntilSunday = 7 - currentDate.getDay();
const upcomingSunday = new Date(currentDate);
upcomingSunday.setDate(currentDate.getDate() + daysUntilSunday);
const prevSunday = new Date(upcomingSunday);
prevSunday.setDate(prevSunday.getDate() - 7);
const thursDate = new Date(prevSunday);
thursDate.setDate(thursDate.getDate() + 4);

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const [songs, setSongs] = useState<Array<Song>>([]);

  const [sunday, setSunday] = useState<string>("");
  const [sundayDate, setSundayDate] = useState<Date>(upcomingSunday);

  useEffect(() => {
    const checkUser = async () => {
      if (session.status === "authenticated") await isUserStored();
    };

    checkUser();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/song");
      const data: Array<Song> = await res.json();

      setSongs(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSunday(
      currentDate <= thursDate
        ? prevSunday.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }) || ""
        : sundayDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          }) || ""
    );
  }, [sundayDate]);

  const cards =
    songs.length > 0 ? (
      songs.map((song) => {
        return (
          <SongCard
            onClick={() => {
              router.push(`/song/${song.id}`);
            }}
            artist={song.artist}
            lyrics={song.lyrics}
            title={song.title}
            key={song.id}
          />
        );
      })
    ) : (
      <div className="w-full h-[200px] flex items-center justify-center">
        <p className="font-bold text-gray-400 text-2xl text-center font-montserrat">
          There are no songs.
        </p>
      </div>
    );

  const preludeCards =
    songs.length > 0
      ? songs.map((song, index) => {
          if (song.linupType !== "PRELUDE" || song.lineupDate === null) {
            return null;
          }

          const linupDate = new Date(song.lineupDate);

          if (linupDate >= prevSunday && currentDate <= thursDate) {
            return (
              <LineupCard
                onClick={() => {
                  router.push(`/song/${song.id}`);
                }}
                color={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                artist={song.artist}
                title={song.title}
                key={song.id}
              />
            );
          }
          return null;
        })
      : [];

  const responseCards =
    songs.length > 0
      ? songs.map((song, index) => {
          if (song.linupType !== "RESPONSE" || song.lineupDate === null) {
            return null;
          }

          const linupDate = new Date(song.lineupDate);

          if (linupDate >= prevSunday && currentDate <= thursDate) {
            return (
              <LineupCard
                onClick={() => {
                  router.push(`/song/${song.id}`);
                }}
                color={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                artist={song.artist}
                title={song.title}
                key={song.id}
              />
            );
          }
          return null;
        })
      : [];

  const adultCards =
    songs.length > 0
      ? songs.map((song, index) => {
          if (song.linupType !== "ADULT" || song.lineupDate === null) {
            return null;
          }

          const linupDate = new Date(song.lineupDate);

          if (linupDate >= prevSunday && currentDate <= thursDate) {
            return (
              <LineupCard
                onClick={() => {
                  router.push(`/song/${song.id}`);
                }}
                color={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                artist={song.artist}
                title={song.title}
                key={song.id}
              />
            );
          }
          return null;
        })
      : [];

  const youthCards =
    songs.length > 0
      ? songs.map((song, index) => {
          if (song.linupType !== "YOUTH" || song.lineupDate === null) {
            return null;
          }

          const linupDate = new Date(song.lineupDate);

          if (linupDate >= prevSunday && currentDate <= thursDate) {
            return (
              <LineupCard
                onClick={() => {
                  router.push(`/song/${song.id}`);
                }}
                color={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                artist={song.artist}
                title={song.title}
                key={song.id}
              />
            );
          }
          return null;
        })
      : [];

  return (
    <div className="min-w-[360px] max-w-[2160px] w-full flex gap-8 flex-col items-center overflow-x-visible">
      <Header />
      <div className="w-full relative flex flex-col gap-8">
        <div className="w-full h-1 px-6 flex items-center">
          <p className="font-montserrat font-bold">Line-Up for: {sunday}</p>
        </div>
        <div className="w-full flex md:flex-row flex-col justify-center items-center">
          <div className="md:h-[300px] md:w-[25%]">
            <Category
              title={"Prelude"}
              cards={
                preludeCards.every((element) => element === null)
                  ? []
                  : preludeCards
              }
            />
            <Category
              title={"Response"}
              cards={
                responseCards.every((element) => element === null)
                  ? []
                  : responseCards
              }
            />
          </div>
          <div className="w-full md:w-[37%] md:h-[300px] md:overflow-auto ">
            <Category
              title={"Proper Service"}
              cards={
                adultCards.every((element) => element === null)
                  ? []
                  : adultCards
              }
            />
          </div>
          <div className="w-full md:w-[37%] md:h-[300px]">
            <Category
              title={"Youth Service"}
              cards={
                youthCards.every((element) => element === null)
                  ? []
                  : youthCards
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full px-6 flex gap-2 flex-col">
        <p className="font-montserrat text-2xl font-bold tracking-wide">
          Other Songs
        </p>
        <div className="w-full py-2 flex overflow-x-scroll gap-4">{cards}</div>
      </div>
      <Footer />
    </div>
  );
}

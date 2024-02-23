"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { Song } from "@prisma/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { loginIsRequiredClient } from "@/lib/clientHelper";
import { isUserAdmin } from "@/lib/serverHelper";

let apiLink =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.PRODUCTION_URL;

const option = ["PRELUDE", "RESPONSE", "ADULT", "YOUTH", "SPECIAL"];

const options = option.map((option) => (
  <option key={option} value={option}>
    {option}
  </option>
));

type NormalizeMap = {
  Cb: string;
  Db: string;
  Eb: string;
  Fb: string;
  Gb: string;
  Ab: string;
  Bb: string;
  "E#": string;
  "B#": string;
};

function transposeChord(chord: string, amount: number) {
  const scale: string[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const normalizeMap: NormalizeMap = {
    Cb: "B",
    Db: "C#",
    Eb: "D#",
    Fb: "E",
    Gb: "F#",
    Ab: "G#",
    Bb: "A#",
    "E#": "F",
    "B#": "C",
  };

  return chord.replace(/[CDEFGAB](b|#)?/g, function (match) {
    var i =
      (scale.indexOf(normalizeMap[match as keyof NormalizeMap] || match) +
        amount) %
      scale.length;
    return scale[i < 0 ? i + scale.length : i];
  });
}

export default function page({ params }: { params: { id: string } }) {
  const session = useSession();

  const [rawData, setRawdata] = useState({
    id: params.id,
    removal: false,
    lineupType: option[0],
    lineupDate: new Date(Date.now()),
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const [song, setSong] = useState<Song>();
  const [linupDate, setLinupDate] = useState<string>();
  const [lyrics, setLyrics] = useState<
    React.JSX.Element[] | React.JSX.Element
  >();
  const [transposeCount, setTransposeCount] = useState(0);

  useEffect(() => {
    const checkUser = async () => {
      if (session.status === "authenticated") {
        const user = await isUserAdmin();

        setIsAdmin(user);
      }
    };

    checkUser();
  }, [session]);

  async function handleOnClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    try {
      const res = await axios.put(`${apiLink}/song/${params.id}`, rawData);
      setDisabled(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  //Handles Song Chords and lyrics Generation
  useEffect(() => {
    if (!song?.lyrics) {
      return;
    }

    const lyricArray = song.lyrics.split("\n").map((line) => {
      return line === "" ? "\n" : line;
    });
    const lyricComponent = lyricArray.map((line) => {
      const regex = /\[([A-G][#bm]?(?:\d{1,2}|maj7?|min7?|sus2?)?)\]/g;

      if (regex.test(line)) {
        const reg = /\[([A-G][#bm]?(?:\d{1,2}|maj7?|min7?|sus2?)?)\]/g;
        const matches = line.split(reg);

        const spans = matches.map((char) => {
          const regChar = /([A-G][#bm]?(?:\d{1,2}|maj7?|min7?|sus2?)?)/g;

          if (regChar.test(char)) {
            return (
              <span
                key={uuidv4()}
                className="font-semibold
                 text-primary bg-gray-200 px-1 rounded-md"
              >
                {transposeChord(char, transposeCount)}
              </span>
            );
          }
          return <span key={uuidv4()}>{char}</span>;
        });

        return (
          <span key={uuidv4()} className="flex">
            {spans}
          </span>
        );
      }

      return <span key={uuidv4()}>{line}</span>;
    });

    setLyrics(lyricComponent);
  }, [song?.lyrics, transposeCount]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/song/${params.id}`);
        const data = await res.json();
        setSong(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!song) {
      return;
    }

    if (song.lineupDate) {
      setLinupDate(
        new Date(song.lineupDate).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }) || ""
      );
    }

    if (song.linupType) {
      setDisabled(true);
    }
  }, [song]);

  useEffect(() => {
    if (!song?.lineupDate) {
      return;
    }
  }, [song?.lineupDate]);

  useEffect(() => {
    if (rawData.removal) {
      try {
        const updateData = async () => {
          const res = await axios.put(`${apiLink}/song/${params.id}`, rawData);
        };

        updateData();
        setDisabled(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }, [rawData.removal]);

  return (
    <div className="w-full">
      <Header />
      {song != undefined ? (
        <div className="w-full">
          {disabled ? (
            <div className="w-full px-6">
              <p className="font-montserrat font-bold text-2xl">
                Line-Up for: {song.linupType}
              </p>
              <p className="font-montserrat font-semibold">{linupDate}</p>
            </div>
          ) : null}
          <div className="w-full p-6 flex flex-col">
            <div className="w-full mb-10">
              <p className="font-montserrat font-bold text-[32px]">
                {song.title}
              </p>
              <p className="font-montserrat font-semibold text-[14px] mt-[-8px]">
                By: {song.artist}
              </p>
            </div>
            <p className="w-full whitespace-pre-wrap text-sm flex flex-col font-montserrat font-medium">
              {lyrics}
            </p>

            <div className="w-full my-4 flex items-center gap-2">
              <p className="font-montserrat text-sm font-bold">Transpose</p>
              <button
                onClick={() => {
                  setTransposeCount(
                    transposeCount <= -11 ? 0 : transposeCount - 1
                  );
                }}
                className="px-2 rounded-lg bg-gray-200 border-2 border-primary"
              >
                <span className="font-montserrat font-bold text-primary">
                  -
                </span>
              </button>
              <p className="font-montserrat text-sm font-bold">
                {transposeCount}
              </p>
              <button
                onClick={() => {
                  setTransposeCount(
                    transposeCount >= 11 ? 0 : transposeCount + 1
                  );
                }}
                className="px-2 rounded-lg bg-gray-200 border-2 border-primary"
              >
                <span className="font-montserrat font-bold text-primary">
                  +
                </span>
              </button>
            </div>

            {isAdmin ? (
              <div className="w-[400px]">
                <div className="w-full mt-10 flex gap-6">
                  <div className="w-full h-[56px] flex flex-col">
                    <label
                      className="font-montserrat text-[#757373] font-bold"
                      htmlFor="type"
                    >
                      Lineup For:
                    </label>
                    <select
                      disabled={disabled}
                      value={rawData.lineupType}
                      onChange={(e) => {
                        setRawdata({ ...rawData, lineupType: e.target.value });
                      }}
                      className="font-montserrat bg-primary h-full text-xs text-white font-semibold tracking-wider px-2 border-2 border-tertiary rounded-md"
                      placeholder={"Song Type..."}
                      name="type"
                      id="type"
                    >
                      {options}
                    </select>
                  </div>

                  <div className="w-full h-[56px] flex flex-col">
                    <label
                      className="font-montserrat text-[#757373] font-bold"
                      htmlFor="type"
                    >
                      Lineup Date
                    </label>
                    <input
                      disabled={disabled}
                      onChange={(e) => {
                        setRawdata({
                          ...rawData,
                          lineupDate: new Date(e.target.value),
                        });
                      }}
                      className="font-montserrat bg-primary font-semibold text-white text-xs p-2 border-2 rounded-md border-tertiary"
                      id="linupDate"
                      type="date"
                    />
                  </div>
                </div>

                <div className="w-full  py-4 flex gap-4">
                  {disabled ? (
                    <button
                      onClick={(e) => {
                        setRawdata({ ...rawData, removal: true });
                      }}
                      className=" hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white"
                    >
                      Remove From Linup
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        handleOnClick(e);
                      }}
                      className=" hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white"
                    >
                      Confirm
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      router.push(`/song/edit/${params.id}`);
                    }}
                    className=" hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen"></div>
      )}
      <Footer />
    </div>
  );
}

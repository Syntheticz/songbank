"use client";

import Dropdown from "@/components/Dropdown";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";

const songType = ["Worship", "Praise"];
const category = ["New Song", "Old Song", "Composed"];

import { Song } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginIsRequiredClient } from "@/lib/clientHelper";
import { useSession } from "next-auth/react";
import { isUserAdmin } from "@/lib/serverHelper";

const emptyRawData: Song = {
  id: "",
  title: "",
  artist: "",
  category: category[0],
  createdAt: new Date(Date.now()),
  type: songType[0],
  votes: 0,
  lineupDate: null,
  linupType: null,
  updatedAt: null,
  lyrics: " ",
  tags: "",
  referenceLink: "",
};

const apiLink =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_BASE_URL
    : process.env.PRODUCTION_URL;

export default function page({ params }: { params: { id: string } }) {
  loginIsRequiredClient();

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const checkUser = async () => {
      if (session.status === "authenticated") {
        const user = await isUserAdmin();

        if (!user) {
          router.push("/");
        }
      }
    };

    checkUser();
  }, [session]);

  const [rawData, setRawdata] = useState<Song>({
    id: "",
    title: "",
    artist: "",
    category: category[0],
    createdAt: new Date(Date.now()),
    type: songType[0],
    votes: 0,
    lineupDate: null,
    linupType: null,
    updatedAt: null,
    lyrics: " ",
    tags: "",
    referenceLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/song/${params.id}`);
      const data: Song = await res.json();
      setRawdata(data);
    };

    fetchData();
  }, []);

  async function handleOnClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiLink}/song/${params.id}`, rawData);
      setRawdata(emptyRawData);

      router.push(`/song/${params.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleOnDelete(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    try {
      const res = await axios.delete(`${apiLink}/song/${params.id}`);

      router.push(`/song`);
    } catch (error) {
      console.log(error);
    }
  }

  return session.status === "authenticated" ? (
    <div className="w-full">
      <Header />
      <div className="w-full flex">
        <div className="w-[50%] flex flex-col gap-4">
          <div className="flex flex-col px-6 gap-1">
            <label
              className="font-montserrat text-[#757373] font-bold"
              htmlFor="title"
            >
              Title
            </label>
            <input
              value={rawData.title}
              onChange={(e) => {
                setRawdata({ ...rawData, title: e.target.value });
              }}
              id="title"
              className="bg-gray-200 border-2 w-full  font-montserrat text-xs h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-md"
              type="text"
              placeholder="Type the title here..."
            />
          </div>

          <div className="flex flex-col px-6 gap-1">
            <label
              className="font-montserrat text-[#757373] font-bold"
              htmlFor="artist"
            >
              Artist
            </label>
            <input
              value={rawData.artist}
              onChange={(e) => {
                setRawdata({ ...rawData, artist: e.target.value });
              }}
              id="artist"
              className="bg-gray-200 border-2 w-full font-montserrat text-xs h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-md"
              type="text"
              placeholder="Type the artist here..."
            />
          </div>

          <div className="flex flex-col px-6 gap-1">
            <label
              className="font-montserrat text-[#757373] font-bold"
              htmlFor="lyrics"
            >
              Lyrics
            </label>
            <textarea
              value={rawData.lyrics}
              onChange={(e) => {
                setRawdata({ ...rawData, lyrics: e.target.value });
              }}
              id="lyrics"
              className="bg-gray-200 border-2 w-full h-72 resize-none font-montserrat text-xs p-2 pr-4 placeholder:font-medium font-semibold border-primary rounded-md"
              placeholder="Type the lyrics here..."
            />
          </div>

          {/* <div className="w-full px-6 flex gap-6">
        <Dropdown
          value={rawData.type}
          onChange={(e) => {
            setRawdata({ ...rawData, type: e.target.value });
          }}
          options={songType}
          label="Song type"
        />
        <Dropdown
          value={rawData.category}
          onChange={(e) => {
            setRawdata({ ...rawData, category: e.target.value });
          }}
          options={category}
          label="Category"
        />
      </div> */}

          <div className="w-full py-4 px-6">
            <button
              onClick={(e) => {
                handleOnClick(e);
              }}
              className=" hover:text-primary hover:bg-white hover:border-primary hover:border-2 p-2 px-3 transition-all bg-primary border-2 text-sm border-tertiary font-montserrat font-semibold rounded-md text-white drop-shadow-md active:bg-primary active:text-white"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="w-[50%] flex flex-col gap-4">
          <div className="flex flex-col px-6 gap-1">
            <label
              className="font-montserrat text-[#757373] font-bold"
              htmlFor="artist"
            >
              Tags
            </label>
            <input
              value={rawData.tags || ""}
              onChange={(e) => {
                setRawdata({ ...rawData, tags: e.target.value });
              }}
              id="artist"
              className="bg-gray-200 border-2 w-full font-montserrat text-xs h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-md"
              type="text"
              placeholder="Type the tags here..."
            />
          </div>
          <div className="flex flex-col px-6 gap-1">
            <label
              className="font-montserrat text-[#757373] font-bold"
              htmlFor="artist"
            >
              Reference Link &#40;Optional&#41;
            </label>
            <input
              value={rawData.referenceLink || ""}
              onChange={(e) => {
                setRawdata({ ...rawData, referenceLink: e.target.value });
              }}
              id="artist"
              className="bg-gray-200 border-2 w-full font-montserrat text-xs h-10 p-2 placeholder:font-medium font-semibold border-primary rounded-md"
              type="text"
              placeholder="Type the tags here..."
            />
          </div>
        </div>
      </div>
      <div className="w-full h-40"></div>
      <Footer />
    </div>
  ) : null;
}

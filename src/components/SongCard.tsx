"use client";
import React from "react";

export default function SongCard({
  title,
  artist,
  lyrics,
  onClick,
}: {
  title: string;
  artist: string;
  lyrics: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={(e) => {
        onClick();
      }}
      className="min-w-[228px] px-[16px] py-[12px] h-[120px] relative bg-primary rounded-md hover:scale-95 cursor-pointer transform-gpu active:scale-100 ease-in-out duration-100 shadow-md"
    >
      <div className="w-full h-full flex flex-col items-start">
        <p className="font-montserrat text-white font-semibold tracking-wide line-clamp-1">
          {title}
        </p>
        <p className="font-montserrat text-white text-xs font-medium tracking-wider">
          By: {artist}
        </p>
        <div className="w-full h-[40%] py-2">
          <p className="font-montserrat text-white text-xs overflow-hidden line-clamp-3 font-light tracking-wider">
            {lyrics}
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

interface Props {
  title: string;
  artist: string;
  color: "bg-primary" | "bg-secondary";
  onClick: () => void;
}

export default function LineupCard({ title, artist, color, onClick }: Props) {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className={`${color} w-[320px] md:w-[180px] h-[80px] rounded-lg shadow-slate-500 shadow-md border cursor-pointer ${
        color === "bg-primary" ? "border-tertiary" : "border-secondary"
      }  ${
        color === "bg-primary" ? "hover:bg-secondary" : "hover:bg-primary"
      } ${
        color === "bg-primary"
          ? "hover:border-secondary"
          : "hover:border-tertiary"
      } active:bg-tertiary  transition-colors`}
    >
      <div className="py-2 px-4 w-full flex flex-col items-center justify-center h-full">
        <div className="w-full">
          <p className="drop-shadow-primary text-white font-montserrat text-sm font-semibold tracking-wide truncate ">
            {title}
          </p>
          <p className="text-[9px] font-montserrat tracking-wider text-white drop-shadow-primary-light">
            By: {artist}
          </p>
        </div>
      </div>
    </div>
  );
}

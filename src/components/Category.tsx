import React from "react";

import LineupCard from "./LineupCard";

export default function Category({
  title,
  cards,
  height,
}: {
  title: String;
  height?: number;
  cards: Array<React.JSX.Element | null>;
}) {
  return (
    <div className="max-w-[1280px] w-full px-[24px] py-2 flex gap-4 flex-col items-center justify-center">
      <div className="w-full ">
        <p className="font-montserrat font-bold drop-shadow-prui">{title}</p>
      </div>
      <div className="w-full gap-4 flex md:flex-row md:justify-start lg:flex-row flex-wrap justify-center items-center">
        {cards.length === 0 ? (
          <div
            className={`w-full h-[${
              height ? `${height}px` : "auto"
            }] flex justify-center items-center`}
          >
            <p className="text-gray-400 font-montserrat py-4 font-semibold">
              There are no songs listed yet.
            </p>
          </div>
        ) : (
          cards
        )}
      </div>
    </div>
  );
}

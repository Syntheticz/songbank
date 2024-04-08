"use client";
import { querySongs } from "@/lib/util";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Options = {
  id: string;
  name: string;
  subtext?: string;
};

export default function Search() {
  const [selected, setSelected] = useState<Options>({ id: "-1", name: "" });
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(true);
  const [filteredList, setFilteredList] = useState<Array<Options>>([]);

  useEffect(() => {
    if (query === "") {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);

    const fetchRecords = async () => {
      const res = await querySongs(10, query);

      const list: Options[] = res.map((record) => ({
        id: record.id,
        name: record.title,
        subtext: record.artist,
      }));

      setFilteredList(list);
    };
    fetchRecords();
  }, [query]);

  return (
    <div className="relative w-full h-full items-center transition-all duration-300 flex">
      <input
        type="search"
        className={` py-2 text-lg w-full ${
          isSearching ? "pl-2 pr-4" : "pl-10"
        } relative ${isSearching ? "rounded-b-none" : ""}`}
        placeholder="Search..."
        onChange={(e) => {
          setQuery(e.target.value as string);
        }}
      />
      <svg
        className={`fill-none stroke-primary absolute ml-3  transition-all duration-300 ${
          isSearching ? "w-0" : "w-6"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M11 6a5 5 0 0 1 5 5m.659 5.655L21 21m-2-10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        />
      </svg>
      <div
        className={`bg-gray-50 transition-all overflow-auto duration-300 absolute w-full top-12 rounded-b-md shadow-lg ${
          isSearching ? "flex flex-col max-h-[124px]" : "hidden min-h-0"
        }`}
      >
        {query !== "" && filteredList.length === 0 ? (
          <div className="cursor-default h-[54px] hover:bg-base-200 flex items-center px-4 w-full ">
            <p className="text-center w-full text-gray-500 font-semibold">
              Record not found.
            </p>
          </div>
        ) : null}
        {filteredList.length > 0
          ? filteredList.map((options) => (
              <div
                onClick={() => {
                  router.push(`/song/${options.id}`);
                }}
                className="cursor-pointer h-[64px] flex-col py-2 hover:bg-gray-200 flex justify-center px-4 w-full "
                key={options.id}
              >
                <p className="truncate overflow-hidden"> {options.name}</p>
                <p className="text-xs">{options.subtext}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

import React from "react";
import YouTube from "react-youtube";

export default function ReferenceVideo({ link }: { link: string }) {
  function youtube_parser(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }
  const opts = {
    height: "220",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <div>
      <p className="font-montserrat font-semibold">Reference Video</p>
      <YouTube opts={opts} videoId={youtube_parser(link) || ""} />
    </div>
  );
}

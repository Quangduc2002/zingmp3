/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
interface ListMusicProps {
  item: any;
  title?: any;
}
function ListMusic({ item, title }: ListMusicProps) {
  const navigate = useNavigate();
  const handleAlbum = (item: any) => {
    const albumPath = item?.link.split(".")[0];
    navigate(albumPath);
  };

  return (
    <div>
      <div className="mt-4 overflow-hidden rounded-lg">
        <img
          className="hover:scale-110 overflow-hidden cursor-pointer rounded-lg ease-in duration-300 max-sm:m-auto"
          src={item.thumbnailM}
          onClick={() => handleAlbum(item)}
          alt=""
        />
      </div>
      <p
        className={`mt-2 ${
          title?.slice(0, 7) === "Top 100"
            ? "text-white font-bold line1 hover:text-[#9b4de0] cursor-pointer"
            : "text-[#ffffff80] line2 "
        }`}
      >
        {title === "Top 100" ? item.title : item.sortDescription}
      </p>
    </div>
  );
}

export default ListMusic;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ListItem from "../ListItem/ListItem";

function Search() {
  const { curSongId, listSearch } = useSelector((state: any) => state.music);
  return (
    <div className="px-16 max-lg:px-7">
      <div className="border-b border-[#ffffff1a] mb-6">
        <h1 className="text-white text-2xl font-bold py-4">Kết quả tìm kiếm</h1>
      </div>
      <div className="flex justify-between items-center py-3 font-bold ">
        <span className="text-[#ffffff80] w-1/2">Bài hát</span>
      </div>
      <div>
        {listSearch?.map((item: any) => {
          return (
            <ListItem
              key={item?.encodeId}
              songData={item}
              curSongId={curSongId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Search;

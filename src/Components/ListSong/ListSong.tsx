/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ListItem from "../ListItem/ListItem";
import moment from "moment";

interface ListSongProps {
  totalDuration: number;
  curSongId: any;
}

function ListSong({ totalDuration, curSongId }: ListSongProps) {
  const { songs } = useSelector((state: any) => state.music);

  return (
    <div>
      <div className="flex justify-between items-center py-3 font-bold ">
        <span className="text-[#ffffff80] w-1/2">Bài hát</span>
        <span className="text-[#ffffff80] flex-1">Album</span>
        <span className="text-[#ffffff80] text-right">Thời gian</span>
      </div>
      <div>
        {songs?.map((song: any) => {
          return (
            <ListItem
              key={song?.encodeId}
              songData={song}
              curSongId={curSongId}
            />
          );
        })}
      </div>
      <div>
        <span className="text-[#ffffff80]">{songs?.length} bài hát</span>
        <span className="text-[#ffffff80] px-2">•</span>
        <span className="text-[#ffffff80]">
          {moment.utc(totalDuration * 1000).format("HH")} giờ &nbsp;
          {moment.utc(totalDuration * 1000).format("mm")} phút
        </span>
      </div>
    </div>
  );
}
export default ListSong;

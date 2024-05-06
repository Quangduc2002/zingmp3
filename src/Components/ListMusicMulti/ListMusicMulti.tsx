/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Icon } from "../UI/IconFont/Icon";
import { useDispatch, useSelector } from "react-redux";
import { setCurSongId, play, playAlbum } from "@/Store/actions/Music";
interface ListMusicMultiProps {
  item: any;
  percent?: any;
}

function ListMusicMulti({ item, percent }: ListMusicMultiProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { curSongId, isPlaying } = useSelector((state: any) => state.music);
  const handleAlbum = (item: any) => {
    const albumPath = item?.link.split(".")[0];
    navigate(albumPath);
  };

  return (
    <div
      className={`listMT flex items-center gap-4 hover:bg-[#ffffff1a] justify-between ${
        curSongId === item?.encodeId ? "bg-[#ffffff1a]" : ""
      } cursor-pointer px-4 py-2 rounded-lg`}
    >
      <div className="flex gap-4">
        <div className="relative h-16 m-auto">
          <img
            className="rounded-lg cursor-pointer w-16 h-16"
            src={item.thumbnailM}
            alt=""
          />
          {isPlaying && curSongId === item?.encodeId ? (
            <div className="absolute flex items-center justify-center top-0 w-full h-full ">
              <img className="w-4 h-4" src="/image/icon-playing.gif" alt="" />
            </div>
          ) : (
            <div
              className={` flex  absolute items-center justify-center top-0 w-full h-full ${
                curSongId === item?.encodeId ? "visible" : "invisible icon"
              } `}
            >
              <Icon
                className="text-white"
                icon="icon-play"
                onClick={() => {
                  dispatch(setCurSongId(item?.encodeId));
                  dispatch(play(true));
                  dispatch(playAlbum(true));
                }}
              />
            </div>
          )}
        </div>
        <div>
          <p
            onClick={() => handleAlbum(item)}
            className="text-white w-max hover:text-[#9b4de0]"
          >
            {item?.title?.length > 30
              ? `${item?.title?.slice(0, 30)}...`
              : item?.title}
          </p>
          <p className="text-[#ffffff80] line2">
            {item?.artists.map((artist: any, index: number) => (
              <span key={index} className="hover:text-[#9b4de0]">
                {index === 0 ? artist?.name : ", " + artist?.name}
              </span>
            ))}
          </p>
          <p className="text-[#ffffff80] ">
            {moment.unix(item?.releaseDate).fromNow()}
          </p>
        </div>
      </div>
      {percent && (
        <div>
          <span className="text-white font-bold text-lg">{percent}%</span>
        </div>
      )}
    </div>
  );
}

export default ListMusicMulti;

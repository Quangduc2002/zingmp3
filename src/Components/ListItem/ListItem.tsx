/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@/Components/UI/IconFont/Icon";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setCurSongId, play, playAlbum } from "@/Store/actions/Music";

interface ListItemProps {
  songData: any;
  curSongId?: any;
  numberOrder?: number;
  rakingStatus?: number;
}

function ListItem({
  songData,
  curSongId,
  numberOrder,
  rakingStatus,
}: ListItemProps) {
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => {
          dispatch(setCurSongId(songData?.encodeId));
          dispatch(play(true));
          dispatch(playAlbum(true));
        }}
        className={`flex justify-between items-center p-2 hover:bg-[#ffffff1a] cursor-pointer ${
          curSongId === songData?.encodeId ? "bg-[#ffffff1a]" : ""
        }`}
      >
        <div className="flex w-1/2 gap-2 items-center">
          {numberOrder ? (
            <span
              className={`${
                numberOrder === 1
                  ? "outline-title1"
                  : numberOrder === 2
                  ? "outline-title2"
                  : numberOrder === 3
                  ? "outline-title3"
                  : "outline-title"
              } text-4xl font-bold w-[70px] text-center`}
            >
              {numberOrder}
            </span>
          ) : (
            <Icon
              className="text-[#dadada]"
              icon="icon-note"
              style={{
                fontSize: 20,
              }}
            />
          )}

          {rakingStatus === 0 ? (
            <div className="mr-3">
              <Icon className="text-[#ffffff80]" icon="icon-minus" />
            </div>
          ) : rakingStatus && rakingStatus >= 1 ? (
            <div className="mr-3">
              <Icon className="text-[#1dc186]" icon="icon-caretup" />
              <p className="text-white">{Math.abs(rakingStatus)}</p>
            </div>
          ) : rakingStatus && rakingStatus <= -1 ? (
            <div className="mr-3">
              <Icon className="text-[#e35050]" icon="icon-caretdown" />
              <p className="text-white">{Math.abs(rakingStatus)}</p>
            </div>
          ) : (
            ""
          )}

          <div className="flex gap-2 items-center">
            <img
              className="w-10 h-10 object-cover rounded-md"
              src={songData?.thumbnail}
              alt="thumbnail"
            />
            <div className="">
              <p className=" text-white">
                {songData?.title?.length > 30
                  ? `${songData?.title?.slice(0, 30)}...`
                  : songData?.title}
              </p>
              <p className="text-[#ffffff80]">{songData?.artistsNames}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 text-[#ffffff80] hover:text-[#9b4de0]">
          {songData?.album?.title?.length > 30
            ? `${songData?.album?.title?.slice(0, 30)}...`
            : songData?.album?.title}
        </div>
        <div className="flex justify-end text-[#ffffff80]">
          {moment.utc(songData?.duration * 1000).format("mm:ss")}
        </div>
      </div>
    </>
  );
}

export default ListItem;

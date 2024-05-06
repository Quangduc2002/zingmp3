/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosGet } from "@/services/UseServices";
import { toast } from "react-toastify";
import { Icon } from "@/Components/UI/IconFont/Icon";
import { play, setCurSongId } from "@/Store/actions/Music";
import moment from "moment";
let intervalId: any;
function Player() {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, atAlbum, songs } = useSelector(
    (state: any) => state.music
  );
  const [songInfo, setSongInfo] = useState<any>(null);
  const [curSecond, setcurSecond] = useState<number>(0);
  const [audio, setAudio] = useState<any>(new Audio());
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const thumbRef = useRef<any>();
  const trackRef = useRef<any>();

  useEffect(() => {
    fetchDetailSong();
  }, [curSongId]);

  const fetchDetailSong = async () => {
    const [res1, res2] = await Promise.all([
      axiosGet("/infosong", {
        params: {
          id: curSongId,
        },
      }),
      axiosGet("/song", {
        params: {
          id: curSongId,
        },
      }),
    ]);

    if (res1.data.err === 0) {
      setSongInfo(res1.data.data);
    }
    if (res2.data.err === 0) {
      audio.pause();
      setAudio(new Audio(res2.data.data["128"]));
    } else {
      audio.pause();
      setAudio(new Audio());
      dispatch(play(false));
      setcurSecond(0);
      toast.warn(res2.data.msg);
      thumbRef.current.style.cssText = `right: 100%`;
    }
  };

  useEffect(() => {
    clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying && thumbRef.current) {
      audio.play();
      intervalId = setInterval(() => {
        const percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setcurSecond(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnd = () => {
      if (isShuffle) {
        console.log("end");
        handleshuffle();
      } else {
        audio.pause();
        dispatch(play(false));
      }
    };
    audio.addEventListener("ended", handleEnd);
    return () => {
      audio.removeEventListener("ended", handleEnd);
    };
  }, [audio, isShuffle]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume, audio]);

  const handleToogglePlay = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(play(false));
    } else {
      audio.play();
      dispatch(play(true));
    }
  };

  const handleClickProgresbar = (e: any) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    const percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setcurSecond(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSongs = () => {
    if (atAlbum) {
      let currentSongIndex: number = 0;
      songs.forEach((item: any, index: number) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(play(true));
    }
  };

  const handlePrevSongs = () => {
    if (songs) {
      let currentSongIndex: number = 0;
      songs.forEach((item: any, index: number) => {
        if (item.encodeId === curSongId) {
          currentSongIndex = index;
        }
      });
      dispatch(setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(play(true));
    }
  };

  const handleshuffle = () => {
    const indexRandom = Math.round(Math.random() * songs?.length) - 1;
    dispatch(setCurSongId(songs[indexRandom].encodeId));
    dispatch(play(true));
  };

  return (
    <div className="flex h-full px-5 ">
      <div className="flex gap-5 items-center h-full w-[30%]">
        <img className="w-16 h-16" src={songInfo?.thumbnail} alt="thumbnail" />
        <div>
          <p className="text-white">{songInfo?.title}</p>
          <p className="text-[#ffffff80]">{songInfo?.artistsNames}</p>
        </div>
        <div className="flex gap-4">
          <Icon
            icon="icon-heart"
            className="text-white cursor-pointer w-[16px] h-[16px]"
            style={{
              fontSize: 20,
            }}
          />
          {/* <Icon
              icon="icon-heartfull"
              className="text-[#9b4de0]"
              style={{
                fontSize: 20,
              }}
            /> */}
          <Icon
            icon="icon-ellipsis"
            className="text-white cursor-pointer w-[16px] h-[16px]"
            style={{
              fontSize: 20,
            }}
          />
        </div>
      </div>
      <div className="w-[40%] m-auto">
        <div className="flex items-center">
          <div className="m-auto">
            <div className="flex gap-2">
              <button
                title={`${
                  isShuffle ? "Tắt phát ngẫu nhiên" : "Bật phát ngẫu nhiên"
                }`}
                className="flex items-center justify-center rounded-full hover:bg-[#ffffff1a] h-[36px] w-[36px]"
              >
                <Icon
                  onClick={() => setIsShuffle(!isShuffle)}
                  icon="icon-shuffle"
                  className={`${
                    isShuffle ? "text-purple-600" : "text-white"
                  } cursor-pointer w-[16px] h-[16px]`}
                />
              </button>
              <button
                onClick={handlePrevSongs}
                className={`flex items-center justify-center rounded-full  h-[36px] w-[36px] ${
                  !songs ? "" : "hover:bg-[#ffffff1a]"
                }`}
              >
                <Icon
                  icon="icon-back"
                  className={` ${
                    !songs ? "text-gray-500" : "cursor-pointer"
                  } text-white cursor-pointer w-[16px] h-[16px] `}
                />
              </button>
              <button
                onClick={() => handleToogglePlay()}
                className=" flex items-center justify-center  hover:border-[#9b4de0] h-[36px] w-[36px] border-2 rounded-full"
              >
                {!isPlaying ? (
                  <Icon
                    onClick={handleToogglePlay}
                    icon="icon-play"
                    className="play text-white cursor-pointer w-[16px] h-[16px] "
                  />
                ) : (
                  <Icon
                    onClick={handleToogglePlay}
                    icon="icon-pause"
                    className="play text-white cursor-pointer w-[16px] h-[16px] "
                  />
                )}
              </button>
              <button
                onClick={handleNextSongs}
                className={`flex items-center justify-center rounded-full  h-[36px] w-[36px] ${
                  !songs ? "" : "hover:bg-[#ffffff1a]"
                }`}
              >
                <Icon
                  icon="icon-next"
                  className={`text-white cursor-pointer w-[16px] h-[16px] ${
                    !songs ? "text-gray-500" : "cursor-pointer"
                  }`}
                />
              </button>
              <button
                title="Bật phát lại tất cả"
                className="flex items-center justify-center rounded-full hover:bg-[#ffffff1a] h-[36px] w-[36px]"
              >
                <Icon
                  icon="icon-repeat"
                  className="text-white cursor-pointer w-[16px] h-[16px]"
                />
              </button>
            </div>
            <div></div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4">
          <span className="text-[#ffffff4d]">
            {moment.utc(curSecond * 1000).format("mm:ss")}
          </span>
          <div
            onClick={handleClickProgresbar}
            ref={trackRef}
            className="duration relative w-3/4 h-1 rounded bg-[#ffffff4d]"
          >
            <div
              ref={thumbRef}
              className="absolute top-0 bottom-0 left-0 bg-white rounded"
            >
              <div className="progressbar"></div>
            </div>
          </div>
          <span className="text-[#ffffff4d]">
            {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
          </span>
        </div>
      </div>
      <div className="w-[30%] flex items-center justify-end">
        <div>
          <div className="flex items-center gap-2">
            {volume > 0 ? (
              <Icon
                onClick={(e) => setVolume(0)}
                icon="icon-volumehight"
                className="text-white cursor-pointer w-[16px] h-[16px]"
                style={{
                  fontSize: 20,
                }}
              />
            ) : (
              <Icon
                onClick={(e) => setVolume(100)}
                icon="icon-volumexmark"
                className="text-white cursor-pointer w-[16px] h-[16px]"
                style={{
                  fontSize: 20,
                }}
              />
            )}
            <input
              className="rounded-lg overflow-hidden appearance-none bg-[#ffffff4d] h-2 w-128"
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(+e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;

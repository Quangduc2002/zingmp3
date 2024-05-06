/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { axiosGet } from "@/services/UseServices";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import ListSong from "@/Components/ListSong/ListSong";
import { useDispatch, useSelector } from "react-redux";
import { playList, loading } from "@/Store/actions/Music";
import Loading from "@/Components/Loading/Loading";
import { toast } from "react-toastify";

function Album() {
  const { id } = useParams();
  const { curSongId, isPlaying, isLoading } = useSelector(
    (state: any) => state.music
  );
  const [playListData, setPlayListData] = useState<any>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetailPlayList();
  }, [id]);

  const fetchDetailPlayList = async () => {
    dispatch(loading(true));
    await axiosGet("/detailplaylist", {
      params: {
        id: id,
      },
    }).then((res) => {
      if (res.data.err !== 0) {
        toast.warn("Không tìm thấy playlist này.");
        navigate("/");
      } else {
        setPlayListData(res.data.data);
        dispatch(playList(res?.data?.data?.song?.items));
        dispatch(loading(false));
      }
    });
  };

  return (
    <div className="w-full lg:absolute top-0 bottom-0 lg:flex gap-8 lg:pl-16 py-8 ">
      {isLoading ? (
        <div className="m-auto">
          <Loading />
        </div>
      ) : (
        <>
          <div className="lg:w-3/12">
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                className={`${
                  playListData?.length === 0 ? "animate-pulse bg-white" : ""
                } hover:scale-110 cursor-pointer ease-in duration-300 max-lg:m-auto rounded-lg`}
                src={playListData?.thumbnailM}
                alt=""
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 border rounded-full">
                {isPlaying && (
                  <img
                    className="p-3 w-11"
                    src="/image/icon-playing.gif"
                    alt=""
                  />
                )}
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-white text-xl font-bold">
                {playListData?.title}
              </h1>
              <div>
                <span className="text-[#ffffff80]">cập nhật: </span>
                <span className="text-[#ffffff80]">
                  {moment
                    .unix(playListData?.contentLastUpdate)
                    .format("MM/DD/YYYY")}
                </span>
              </div>
              <p className="text-[#ffffff80]">{playListData?.artistsNames}</p>
              <p className="text-[#ffffff80]">
                {Math.round(playListData?.like / 1000)}K người yêu thích
              </p>
            </div>
          </div>
          <div className="lg:w-9/12 overflow-y-scroll scroll lg:pr-16 max-lg:mt-4">
            <div>
              <span className={"text-gray-600"}>Lời tựa </span>
              <span className="text-white">
                {playListData?.sortDescription}
              </span>
            </div>
            <div>
              <ListSong
                totalDuration={playListData?.song?.totalDuration}
                curSongId={curSongId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Album;

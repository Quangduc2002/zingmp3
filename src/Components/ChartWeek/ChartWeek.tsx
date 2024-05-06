/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Icon } from "../UI/IconFont/Icon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { play, playAlbum, setCurSongId } from "@/Store/actions/Music";
import { useNavigate } from "react-router-dom";

interface ChartWeekProps {
  chartWeeks: any;
}

const ColumnChart = (props: any) => {
  const navigate = useNavigate();
  const { chartWeeks } = props;
  const dispatch = useDispatch();
  const { curSongId } = useSelector((state: any) => state.music);
  const handleClickChartWeek = (item: any) => {
    navigate(item);
  };
  return (
    <div className="bg-[#ffffff0d] px-2 py-4 rounded-2xl">
      <h1 className="pl-10 text-white text-2xl font-bold">
        {chartWeeks[0] === "vn"
          ? "Việt Nam"
          : chartWeeks[0] === "us"
          ? "US-UK"
          : chartWeeks[0] === "korea"
          ? "K-Pop"
          : ""}
      </h1>
      {chartWeeks[1]?.items?.slice(0, 5)?.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            dispatch(setCurSongId(item?.encodeId));
            dispatch(play(true));
            dispatch(playAlbum(true));
          }}
          className={`flex justify-between items-center p-2 hover:bg-[#ffffff1a] cursor-pointer gap-4 rounded-lg
            ${curSongId === item?.encodeId ? "bg-[#ffffff1a]" : ""}
            `}
        >
          <div className="flex gap-2 items-center">
            <span
              className={`${
                index + 1 === 1
                  ? "outline-title1"
                  : index + 1 === 2
                  ? "outline-title2"
                  : index + 1 === 3
                  ? "outline-title3"
                  : "outline-title"
              } text-3xl font-bold text-center`}
            >
              {index + 1}
            </span>

            {item.rakingStatus === 0 ? (
              <div className="mx-2">
                <Icon className="text-[#ffffff80]" icon="icon-minus" />
              </div>
            ) : item.rakingStatus && item.rakingStatus >= 1 ? (
              <div className="mx-2">
                <Icon className="text-[#1dc186]" icon="icon-caretup" />
                <p className="text-white">{Math.abs(item.rakingStatus)}</p>
              </div>
            ) : item.rakingStatus && item.rakingStatus <= -1 ? (
              <div className="mx-2">
                <Icon className="text-[#e35050]" icon="icon-caretdown" />
                <p className="text-white">{Math.abs(item.rakingStatus)}</p>
              </div>
            ) : (
              ""
            )}

            <div className="flex gap-2 items-center">
              <img
                className="w-10 h-10 object-cover rounded-md"
                src={item.thumbnail}
                alt="thumbnail"
              />
              <div className="">
                <p className=" text-white">
                  {item.title?.length > 20
                    ? `${item.title?.slice(0, 20)}...`
                    : item.title}
                </p>
                <p className="text-[#ffffff80]">
                  {item.artistsNames?.length > 20
                    ? `${item.artistsNames?.slice(0, 20)}...`
                    : item.artistsNames}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end text-[#ffffff80]">
            {moment.utc(item.duration * 1000).format("mm:ss")}
          </div>
        </div>
      ))}
      <div className="text-center mt-6">
        <button
          onClick={() => handleClickChartWeek(chartWeeks[1].link)}
          className="py-2 px-5 border border-white rounded-full text-white hover:bg-[#ffffff1a]"
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

function ChartWeek({ chartWeeks }: ChartWeekProps) {
  return (
    <div className="mt-10">
      <div
        className="relative mx-[calc(4rem*-1)] py-12"
        style={{
          backgroundImage: "url(/image/week-chart-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // filter: "grayscale(1)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#201335e6]"></div>
        <div className="lg:px-16 pb-8 relative z-10">
          <h1 className="text-white font-bold text-4xl">Bảng Xếp Hạng Tuần</h1>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {Object.entries(chartWeeks)?.map((item: any, index: number) => (
              <ColumnChart
                key={index}
                chartWeeks={item}
                numberOrder={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartWeek;

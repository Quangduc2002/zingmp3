/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ChartSection from "@/Components/ChartSection/ChartSection";
import ChartWeek from "@/Components/ChartWeek/ChartWeek";
import ListItem from "@/Components/ListItem/ListItem";
import Loading from "@/Components/Loading/Loading";
import { axiosGet } from "@/services/UseServices";
import React, { useEffect, useState } from "react";

function ZingChart() {
  const [tops, setTops] = useState([]);
  const [chartWeeks, setchartWeeks] = useState([]);
  const [songs, setSongs] = useState([]);
  const [isShowFull, setIsShowFull] = useState<boolean>(false);
  useEffect(() => {
    axiosGet("/charthome")
      .then((res) => {
        setTops(res.data.data.RTChart.items);
        setchartWeeks(res.data.data.weekChart);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!isShowFull) {
      setSongs(tops?.filter((i, index) => index < 10));
    } else {
      setSongs(tops);
    }
  }, [isShowFull, tops]);

  return (
    <div className="lg:px-16 mb-5">
      {songs.length > 0 ? (
        <>
          <ChartSection />
          <div className="mt-10">
            {songs?.map((item: any, index: number) => (
              <ListItem
                key={item.encodeId}
                songData={item}
                numberOrder={index + 1}
                rakingStatus={item.rakingStatus}
              />
            ))}
            {!isShowFull ? (
              <div className="text-center mt-6">
                <button
                  className="py-2 px-5 border border-white rounded-full text-white hover:bg-[#ffffff1a]"
                  onClick={() => setIsShowFull(true)}
                >
                  Xem top 100
                </button>
              </div>
            ) : (
              <div className="text-center mt-6">
                <button
                  className="py-2 px-5 border border-white rounded-full text-white hover:bg-[#ffffff1a]"
                  onClick={() => setIsShowFull(false)}
                >
                  Ẩn bớt
                </button>
              </div>
            )}
          </div>
          <ChartWeek chartWeeks={chartWeeks} />
        </>
      ) : (
        <div className="m-auto">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default ZingChart;

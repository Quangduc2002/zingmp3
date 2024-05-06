/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItem from "@/Components/ListItem/ListItem";
import Loading from "@/Components/Loading/Loading";
import { axiosGet } from "@/services/UseServices";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function ListChartWeek() {
  const { id } = useParams();
  const [chartWeeks, setchartWeeks] = useState([]);
  interface ChartWeek {
    link: any;
    items: any;
    country: any;
  }

  useEffect(() => {
    axiosGet("/charthome")
      .then((res) => {
        setchartWeeks(res.data.data.weekChart);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {Object.entries(chartWeeks).length > 0 ? (
        <div className="lg:px-16 py-8 mb-5">
          <h1 className="text-5xl text-white font-bold">Bảng Xếp Hạng Tuần</h1>
          <ul className="flex mt-8 gap-8">
            {(Object.values(chartWeeks) as ChartWeek[])?.map((item) => (
              <NavLink
                to={item.link}
                // className={"opacity-70 hover:opacity-100 "}
                className={({ isActive }) =>
                  ["opacity-70 hover:opacity-100", isActive ? "isActive" : null]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <li className="text-white text-2xl font-bold py-4">
                  {item.country === "vn"
                    ? "Việt Nam"
                    : item.country === "us"
                    ? "US-UK"
                    : item.country === "korea"
                    ? "K-Pop"
                    : ""}
                </li>
              </NavLink>
            ))}
          </ul>
          <div className="mt-6">
            {(Object.values(chartWeeks) as ChartWeek[])
              ?.find((item) => item?.link?.includes(id))
              ?.items?.map((item: any, index: number) => (
                <ListItem
                  key={item.encodeId}
                  songData={item}
                  numberOrder={index + 1}
                  rakingStatus={item.rakingStatus}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="m-auto">
          <Loading />
        </div>
      )}
    </>
  );
}

export default ListChartWeek;

import React from "react"; /* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ListMusic from "../ListMusic/ListMusic";
import ListTitleMusic from "../ListTitleMusic/ListTitleMusic";
function Top100() {
  const { top100 } = useSelector((state: any) => state.app);

  return (
    <div className="mt-12">
      <ListTitleMusic item={top100?.title} />
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 gap-4">
        {top100?.items?.slice(0, 5)?.map((item: any) => (
          <div key={item?.encodeId}>
            <ListMusic title={top100?.title} item={item} />
            <p className="text-[#ffffff80] line2">
              {item?.artists.map((artist: any, index: number) => (
                <span
                  className="hover:text-[#9b4de0] cursor-pointer"
                  key={index}
                >
                  {index === 0 ? artist?.name : ", " + artist?.name}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Top100;

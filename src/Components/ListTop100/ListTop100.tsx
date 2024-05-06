/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTop100 } from "@/Store/actions/Home";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTitleMusic from "../ListTitleMusic/ListTitleMusic";
import ListMusic from "../ListMusic/ListMusic";
import { Icon } from "../UI/IconFont/Icon";

function ListTop100() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTop100());
  }, []);

  const { listTop100 } = useSelector((state: any) => state.app);

  return (
    <div className="mt-[80px] px-16 py-8 mb-5 ">
      <div className="text-center">
        <Icon
          icon="icon-top100"
          className="w-[625px] h-[166px] m-auto text-[#9b4de0] "
        />
      </div>
      {listTop100?.data?.map((item1: any, index: number) => (
        <div key={index} className="mt-12">
          <ListTitleMusic key={index} item={item1?.title} />
          <div className="grid grid-cols-5 gap-4">
            {item1?.items?.map((item2: any) => (
              <div key={item2?.encodeId}>
                <ListMusic title={item2.title} item={item2} />
                <p className="text-[#ffffff80] line2">
                  {item2?.artists?.map((artist: any, index: number) => (
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
      ))}
    </div>
  );
}

export default ListTop100;

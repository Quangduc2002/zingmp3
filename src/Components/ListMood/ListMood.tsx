import React from "react"; /* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import ListMusic from "../ListMusic/ListMusic";
import ListTitleMusic from "../ListTitleMusic/ListTitleMusic";

function ListMood() {
  const { mood } = useSelector((state: any) => state.app);

  return (
    <div className="mt-12">
      <ListTitleMusic item={mood?.title} />
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 max-sm:grid-cols-2 gap-4">
        {mood?.items?.slice(0, 5)?.map((item: any) => (
          <ListMusic key={item?.encodeId} item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListMood;

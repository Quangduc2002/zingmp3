/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Icon } from "../UI/IconFont/Icon";

interface ListTitleMusicProps {
  item: any;
}
function ListTitleMusic({ item }: ListTitleMusicProps) {
  const location: any = useLocation();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold ">{item}</h1>
      {location.pathname !== "/top100" ? (
        <NavLink
          className={"text-[#ffffff80] flex items-center hover:text-[#9b4de0]"}
          to={"/top100"}
        >
          Tất cả
          <Icon className="ml-2" icon="icon-chevronright" />
        </NavLink>
      ) : (
        ""
      )}
    </div>
  );
}

export default ListTitleMusic;

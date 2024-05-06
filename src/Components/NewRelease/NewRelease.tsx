/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Icon } from "../UI/IconFont/Icon";
import ListMusicMulti from "../ListMusicMulti/ListMusicMulti";

function NewRelease() {
  const { newRelease } = useSelector((state: any) => state.app);
  const genreSelects = [
    {
      id: 1,
      name: "Tất cả",
    },
    {
      id: 2,
      name: "Việt nam",
    },
    {
      id: 3,
      name: "Quốc tế",
    },
  ];
  const [genreSelect, setGenreSelect] = useState<string>("Tất cả");
  const [NewReleases, setNewReleases] = useState<Array<any>>();

  const handleNewRelease = (value: any) => {
    if (value === "Tất cả") {
      setNewReleases(newRelease.items.all);
    } else if (value === "Việt nam") {
      setNewReleases(newRelease.items.vPop);
    } else if (value === "Quốc tế") {
      setNewReleases(newRelease.items.others);
    }
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-white text-2xl font-bold ">
            {newRelease?.title}
          </h1>
          <ul className="sm:flex gap-4 mt-4">
            {genreSelects.map((genre) => (
              <li
                key={genre.id}
                className={`px-4 py-1 border rounded-full border-[#ffffff1a] hover:opacity-80 cursor-pointer max-sm:my-2 text-center ${
                  genreSelect === genre.name ? "bg-[#9b4de0]" : ""
                }`}
              >
                <input
                  id={`genreSelects-${genre.id}`}
                  type="radio"
                  className="hidden"
                  name={"genreSelect"}
                  value={genre.name}
                  checked={genre?.name.includes(genreSelect) ? true : false}
                  onChange={(e) => setGenreSelect(e.target.value)}
                  onClick={() => handleNewRelease(genre.name)}
                />
                <label
                  htmlFor={`genreSelects-${genre.id}`}
                  className={`text-white cursor-pointer`}
                >
                  {genre.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <NavLink
          className={"text-[#ffffff80] flex items-center hover:text-[#9b4de0]"}
          to={""}
        >
          Tất cả
          <Icon className="ml-2" icon="icon-chevronright" />
        </NavLink>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-rows-3 mt-2">
        {NewReleases
          ? NewReleases?.slice(0, 12).map((item) => (
              <ListMusicMulti key={item.encodeId} item={item} />
            ))
          : newRelease?.items?.all
              ?.slice(0, 12)
              .map((item: any) => (
                <ListMusicMulti key={item.encodeId} item={item} />
              ))}
      </div>
    </div>
  );
}

export default NewRelease;

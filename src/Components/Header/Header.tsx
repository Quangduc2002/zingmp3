/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";
import { Icon } from "@/Components/UI/IconFont/Icon";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getSearch } from "@/Store/actions/Music";
import { ROUTE_PATH } from "@/routes/route.constant";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async (e: any) => {
    if (e.keyCode === 13) {
      dispatch(getSearch(keyword));
      navigate({
        pathname: `${ROUTE_PATH.SEARCH}`,
        search: createSearchParams({
          q: `${keyword}`,
        }).toString(),
      });
    }
  };

  return (
    <div className="fixed z-20 flex items-center bg-[#170f23] top-0 lg:left-60 right-0 h-20 max-lg:w-[calc(100%_-_70px)] ">
      <div className="h-10 flex items-center justify-between w-full px-16 max-lg:px-7">
        <div className="relative lg:w-[440px] h-full ">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 h-full pointer-events-none ">
            <Icon
              className="text-[#dadada]"
              icon="icon-search"
              style={{
                fontSize: 20,
              }}
            />
          </div>
          <input
            type="search"
            className="block h-full pl-10 w-full bg-[#ffffff1a] text-sm text-white rounded-full outline-none"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            required
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={handleSearch}
          />
        </div>
        <div>
          <NavLink
            className="bg-[#9b4de0] py-2.5 px-5 text-white rounded-full hover:opacity-90"
            to={""}
          >
            Đăng nhập
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;

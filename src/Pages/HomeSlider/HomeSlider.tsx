/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { setCurSongId, play, playList } from "@/Store/actions/Music";
import { useNavigate } from "react-router-dom";

function HomeSlider() {
  const { banner } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = {
    rewind: true,
    // type: "loop",
    interval: 1500,
    perPage: 3,
    pagination: true,
    drag: 1,
    perMove: 1,
    arrows: banner.length > 3 ? true : false,
    breakpoints: {
      900: {
        perPage: 2,
      },
      640: {
        perPage: 1,
      },
    },
  };

  const handleClickBanner = (item: any) => {
    if (item?.type === 1) {
      dispatch(setCurSongId(item?.encodeId));
      dispatch(play(true));
      dispatch(playList(null));
    } else if (item?.type === 4) {
      const albumPath = item?.link.split(".")[0];
      navigate(albumPath);
    } else {
      dispatch(playList(null));
    }
  };

  return (
    <Splide aria-label="Book related" hasTrack={false} options={options as any}>
      <SplideTrack>
        {banner.map((item: any, index: number) => (
          <SplideSlide className="!mx-2 !w-[32%]" key={index}>
            <img
              onClick={() => handleClickBanner(item)}
              className="slider-item rounded-lg cursor-pointer "
              key={item.encodeId}
              src={item.banner}
              alt=""
            />
          </SplideSlide>
        ))}
      </SplideTrack>
    </Splide>
  );
}

export default HomeSlider;

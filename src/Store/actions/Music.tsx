/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosGet } from "@/services/UseServices";
import {
  PLAY,
  PLAYLIST,
  SET_CUR_SONG_ID,
  PLAYALBUM,
  ISLOADING,
  SEARCH,
} from "./ActionType";

export const setCurSongId = (sid: any) => ({
  type: SET_CUR_SONG_ID,
  sid: sid,
});

export const play = (flag: any) => ({
  type: PLAY,
  flag,
});

export const playAlbum = (flag: any) => ({
  type: PLAYALBUM,
  flag,
});

export const playList = (songs: any) => ({
  type: PLAYLIST,
  songs,
});

export const loading = (flag: any) => ({
  type: ISLOADING,
  flag,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSearch = (keyword: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (
    dispatch: (arg0: { type: string; listSearch: any }) => void
  ) => {
    try {
      const response = await axiosGet("/search", {
        params: { keyword: keyword },
      });
      if (response.data.err === 0) {
        dispatch({
          type: SEARCH,
          listSearch: response.data.data,
        });
      } else {
        dispatch({
          type: SEARCH,
          listSearch: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Reducer } from "redux";
import { MusicState } from "../Types/musicTypes";
import {
  ISLOADING,
  PLAY,
  PLAYALBUM,
  PLAYLIST,
  SEARCH,
  SET_CUR_SONG_ID,
} from "../actions/ActionType";

const initialState: MusicState = {
  curSongId: null,
  isPlaying: false,
  atAlbum: false,
  songs: [],
  listSearch: [],
  isLoading: false,
};

const musicReducer: Reducer<MusicState, any> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_CUR_SONG_ID:
      return {
        ...state,
        curSongId: action.sid || null,
      };
    case PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case PLAYALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case PLAYLIST:
      return {
        ...state,
        songs: action.songs,
      };
    case ISLOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case SEARCH:
      return {
        ...state,
        listSearch: action.listSearch.songs || null,
      };
    default:
      return state;
  }
};

export default musicReducer;

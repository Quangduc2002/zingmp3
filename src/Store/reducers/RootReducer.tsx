/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import appReducer from "./AppReducer";
import MusicReducer from "./MusicReducer";
import { MusicState } from "../Types/musicTypes";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: "music",
  whiteList: ["curSongId"],
};
// persistReducer<MusicState, any>(persistConfig, rootReducer);
// persistReducer(musicConfig, MusicReducer),
const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer<MusicState, any>(musicConfig, MusicReducer),
});

export default rootReducer;

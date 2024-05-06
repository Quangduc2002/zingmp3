import { GET_BANNER, GET_TOP100 } from "../actions/ActionType";

const initState = {
  banner: [],
  chill: {},
  mood: {},
  top100: {},
  listTop100: [],
  newRelease: {},
  chart: {},
  rank: [],
  list: [],
};

const AppReducer = (
  state = initState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: { type: any; homeData: any[] }
) => {
  switch (action.type) {
    case GET_BANNER:
      return {
        ...state,
        banner:
          action.homeData.find((item) => item.sectionType === "banner").items ||
          null,
        chill:
          action.homeData.find((item) => item.sectionId === "hEditorTheme") ||
          null,
        mood:
          action.homeData.find((item) => item.sectionId === "hEditorTheme4") ||
          null,
        top100:
          action.homeData.find((item) => item.sectionId === "h100") || null,
        chart:
          action.homeData.find((item) => item.sectionId === "hZC")?.chart ||
          null,
        rank:
          action.homeData.find((item) => item.sectionId === "hZC")?.items ||
          null,
        newRelease:
          action.homeData.find((item) => item.sectionType === "new-release") ||
          null,
        list: action.homeData || null,
      };
    case GET_TOP100:
      return {
        ...state,
        listTop100: action.homeData,
      };

    default:
      return state;
  }
};

export default AppReducer;

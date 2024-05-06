import { GET_BANNER, GET_TOP100 } from "./ActionType";
import { axiosGet } from "../../services/UseServices";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getHome = (): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: (arg0: { type: string; homeData: any }) => void) => {
    try {
      const response = await axiosGet("/home");
      if (response.data.err === 0) {
        dispatch({
          type: GET_BANNER,
          homeData: response.data.data.items,
        });
      } else {
        dispatch({
          type: GET_BANNER,
          homeData: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTop100 = (): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (dispatch: (arg0: { type: string; homeData: any }) => void) => {
    try {
      const response = await axiosGet("/top100");
      if (response.data.err === 0) {
        dispatch({
          type: GET_TOP100,
          homeData: response.data,
        });
      } else {
        dispatch({
          type: GET_TOP100,
          homeData: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

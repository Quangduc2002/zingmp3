/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout/AppLayout";
import { ROUTE_PATH } from "./route.constant";
import React from "react";
import ListTop100 from "@/Components/ListTop100/ListTop100";
import Search from "@/Components/Search/Search";
import ZingChart from "@/Pages/ZingChart/ZingChart";
import ListChartWeek from "@/Pages/ListChartWeek/ListChartWeek";

const Home = React.lazy(() => import("../Pages/Home/Home"));
const Album = React.lazy(() => import("../Pages/Album/Album"));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <Home />,
      },
      {
        path: ROUTE_PATH.ALBUM,
        element: <Album />,
      },
      {
        path: ROUTE_PATH.PLAYLIST,
        element: <Album />,
      },
      {
        path: ROUTE_PATH.BAIHAT,
        element: <Album />,
      },
      {
        path: ROUTE_PATH.TOP100,
        element: <ListTop100 />,
      },
      {
        path: ROUTE_PATH.SEARCH,
        element: <Search />,
      },
      {
        path: ROUTE_PATH.ZINGCHART,
        element: <ZingChart />,
      },
      {
        path: ROUTE_PATH.LISTCHARTWEEK,
        element: <ListChartWeek />,
      },
    ],
  },
]);

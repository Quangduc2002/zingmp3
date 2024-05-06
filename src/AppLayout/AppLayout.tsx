import { Suspense } from "react";

import { Outlet } from "react-router-dom";

import Header from "@/Components/Header/Header";
import Sidebar from "@/Components/Sidebar/Sidebar";
import Player from "@/Components/Player/Player";

const AppLayout = () => {
  return (
    <Suspense fallback={undefined}>
      <div className="flex">
        <Header />
        <Sidebar />

        <main className="relative lg:w-[calc(100%_-_240px)] max-lg:w-full bg-[#170f23] lg:ml-[240px] overflow-hidden overflow-y-scroll mb-[89px] mt-20 h-screen">
          <div className="w-full lg:absolute top-0 bottom-0 max-lg:w-[calc(100%_-_70px)] max-lg:ml-[70px]  max-lg:px-7">
            <Outlet />
          </div>
        </main>
      </div>

      <div className="fixed right-0 left-0 bottom-0 h-[90px] z-30 bg-[#130c1c]">
        <Player />
      </div>
    </Suspense>
  );
};

export default AppLayout;

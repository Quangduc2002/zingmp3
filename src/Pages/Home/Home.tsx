/* eslint-disable @typescript-eslint/no-explicit-any */
import ChartSection from "@/Components/ChartSection/ChartSection";
import ListChill from "@/Components/ListChill/ListChill";
import ListMood from "@/Components/ListMood/ListMood";
import Loading from "@/Components/Loading/Loading";
import NewRelease from "@/Components/NewRelease/NewRelease";
import Top100 from "@/Components/Top100/Top100";
import HomeSlider from "@/Pages/HomeSlider/HomeSlider";
import { useSelector } from "react-redux";

function Home() {
  const { banner } = useSelector((state: any) => state.app);
  if (banner.length > 0) {
    return (
      <div className="lg:px-16 py-8 mb-5">
        <HomeSlider />
        <ListChill />
        <ListMood />
        <Top100 />
        <NewRelease />
        <ChartSection />
      </div>
    );
  } else {
    return (
      <div className="w-full lg:absolute top-0 bottom-0 lg:flex gap-8 lg:pl-16 py-8 ">
        <div className="m-auto">
          <Loading />
        </div>
      </div>
    );
  }
}

export default Home;

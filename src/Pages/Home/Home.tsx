import ChartSection from "@/Components/ChartSection/ChartSection";
import ListChill from "@/Components/ListChill/ListChill";
import ListMood from "@/Components/ListMood/ListMood";
import NewRelease from "@/Components/NewRelease/NewRelease";
import Top100 from "@/Components/Top100/Top100";
import HomeSlider from "@/Pages/HomeSlider/HomeSlider";

function Home() {
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
}

export default Home;

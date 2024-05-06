/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, ChartOptions } from "chart.js";
import { useSelector } from "react-redux";
import ListMusicMulti from "../ListMusicMulti/ListMusicMulti";
function ChartSection() {
  Chart.register(CategoryScale);
  const [data, setData] = useState<any>({});
  const { chart, rank } = useSelector((state: any) => state.app);

  const options: ChartOptions<"line"> = {
    responsive: true,
    aspectRatio: 4,
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          drawTicks: false,
        },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
      x: {
        ticks: { color: "rgba(255, 255, 255, 0.5)", font: { size: 12 } },
        grid: { color: "transparent" },
      },
    },
    plugins: {
      legend: {
        display: false, // Define legend options as a partial object
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item: any) => +item.hour % 2 !== 0)
      ?.map((item: any) => item.hour + ":00");

    const datasets = [];
    for (let i = 0; i < 3; i++) {
      if (chart?.items) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item: any) => +item.hour % 2 === 0)
            ?.map((item: any) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 2,
          pointRadius: 0,
          pointBackgroundColor: "white",
          pointHoverBackgroundColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverRadius: 4,
          pointHoverBorderColor: "white",
          pointHoverBorderWidth: 1,
        });
      }
    }
    setData({ labels, datasets });
  }, [chart]);

  return (
    <div className="mt-12 bg-gradient-to-t from-[#69467D] to-[#780E93] rounded-lg p-4">
      <h3 className="text-white font-bold w-max text-2xl ">#zingchart</h3>
      <div className="flex max-lg:flex-col-reverse gap-4 mt-4">
        <div className="lg:w-2/5">
          {rank?.slice(0, 3)?.map((item: any, index: number) => (
            <ListMusicMulti
              key={index}
              item={item}
              percent={Math.round((+item?.score * 100) / +chart?.totalScore)}
            />
          ))}
        </div>
        <div className="lg:w-3/5 ">
          {data?.labels?.length > 0 && (
            <Line
              className="max-lg:!w-full max-lg:!h-[300px] max-md:!h-auto"
              data={data}
              options={options}
              height={400}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChartSection;

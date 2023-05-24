import { useEffect } from "react";
import { init } from "echarts";
import { useFirestore } from "../../firebase/Firestore";
import { getCurrentDate } from "../../utils/utils";

function Chart() {
  const {
    mileageUnit,
    minMileage,
    currentMileage,
    maxMileage,
    minDate,
    maxDate,
  } = useFirestore();

  const currentDate = getCurrentDate();

  const isSmallScreen = () => window.innerWidth < 450;

  const dataToDisplay = [
    [minDate, minMileage],
    [currentDate, currentMileage],
    [maxDate, maxMileage],
  ];

  const option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      valueFormatter: (value) => `${Math.floor(value)} ${mileageUnit}`,
    },
    grid: {
      containLabel: true,
      left: 30,
      right: 40,
      top: 50,
      bottom: 50,
    },
    xAxis: {
      type: "time",
      name: "Date",
      nameLocation: "center",
      nameGap: 30,
      splitNumber: 5,
      boundaryGap: [0, 0.01],
      axisLine: {
        show: true,
        lineStyle: {
          type: "solid",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Mileage",
      nameTextStyle: {
        align: "right",
      },
      axisLabel: {
        formatter(value) {
          if (isSmallScreen() && value >= 1000) {
            return `${Math.floor(value / 1000)}k`;
          }
          return Math.floor(value);
        },
      },
      min: minMileage,
      max: maxMileage,
      splitLine: {
        lineStyle: {
          color: "rgba(200, 200, 200, 1)",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: "solid",
        },
      },
    },
    series: [
      {
        data: dataToDisplay,
        type: "line",
      },
    ],
  };

  useEffect(() => {
    const chart = init(document.getElementById("chart"));

    const loadOption = () => {
      chart.setOption(option);
    };

    const handleWindowResize = () => {
      chart.resize();
      loadOption();
    };

    window.addEventListener("resize", handleWindowResize);

    loadOption();

    return () => {
      chart.dispose();
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [mileageUnit, minMileage, currentMileage, maxMileage, minDate, maxDate]);

  return <div id="chart" className="w-full h-full" />;
}

export default Chart;

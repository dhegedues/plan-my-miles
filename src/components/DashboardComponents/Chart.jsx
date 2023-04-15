import { useEffect } from "react";
import { init } from "echarts";

function Chart() {

  const mileageHistory = [
    ["2023-02-27", 16],
    ["2023-03-05", 378],
    ["2023-03-16", 824],
    ["2023-03-23", 1371],
    ["2023-04-01", 1918],
    ["2023-04-13", 2287]
  ]

  const mileageProjection = [
    ["2023-04-13", 2287],
    ["2023-12-31", 15000]
  ]

  let monthsToShow = 12;
  let isSmallScreen = true;

  var option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      }
    },
    xAxis: {
      type: 'time',
      name: 'Date',
      nameLocation: 'center',
      nameGap: 30,
      splitNumber: monthsToShow,
      boundaryGap: [0, 0.01],
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: 'Mileage',
      axisLabel: {
        formatter: function (value) {
          if (isSmallScreen && value >= 1000) {
            return value/1000 + 'k';
          }
          return value;
        }
      },
      min: 16,
      max: 15000,
      splitLine: {
        lineStyle: {
          color: '#9ca3af'
        }
      },
      axisLine: {
        show: true,
        lineStyle: {
          type: 'solid'
        }
      }
    },
    series: [
      {
        data: mileageHistory,
        type: 'line',
        smooth: true
      },
      {
        data: mileageProjection,
        type: 'line',
        smooth: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    ]
  };

  useEffect(() => {
    const loadOption = () => {
      isSmallScreen = window.innerWidth < 450 ? true : false;
      monthsToShow = window.innerWidth < 450 ? 4 : 12;
      option.xAxis.splitNumber = monthsToShow;
      chart.setOption(option);
    }

    const handleWindowResize = () => {
      chart.resize();
      loadOption();
    }

    const chart = init(document.getElementById('chart'));
    window.addEventListener("resize", handleWindowResize);
    loadOption();

    return () => {
      chart.dispose();
      window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  return (
    <div id="chart" className="w-full h-[24rem] max-h-screen ml-[8px]"></div>
  )
}

export default Chart;
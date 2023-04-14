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

  var option = {
    color: ["#3398DB"],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      }
    },
    legend: {
      data: ['mileage']
    },
    xAxis: {
      type: 'time',
      name: 'Date',
      min: mileageHistory[0][0],
      max: mileageProjection[mileageProjection.length-1][0],
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
          normal: {
            type: 'dashed'
          }
        }
      }
    ]
  };

  useEffect(() => {
    const chart = init(document.getElementById('chart'));

    const resizeChart = () => {
      chart.resize()
    }

    window.addEventListener("resize", resizeChart);

    chart.setOption(option);

    return () => {
      chart.dispose();
      window.removeEventListener("resize", resizeChart);
    }
  }, [])

  return (
    <div id="chart" className="w-full h-[32rem]"></div>
  )
}

export default Chart;
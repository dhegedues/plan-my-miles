import { useEffect, useState } from "react";
import { init } from "echarts";

function Chart({combinedHistory}) {
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
        data: combinedHistory,
        type: 'line',
        markArea: {
          itemStyle: {
            color: 'rgba(0, 0, 0, 0.1)',
          },
          data: []
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
  }, [combinedHistory]);

  return (
    <div id="chart" className="w-full h-[24rem] max-h-screen ml-[8px]"></div>
  )
}

export default Chart;
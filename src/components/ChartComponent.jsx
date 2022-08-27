import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export default function ChartComponent({ data }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "white",
        background: { type: "solid", color: "black" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    
    chart.timeScale().fitContent();

    const series = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    series.setData(data);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
}

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useThemeContext } from "../hooks/useThemeContext";

export default function ApexChart({ coin }) {
  const [loading, setLoading] = useState(false);
  const { darkMode } = useThemeContext();
  const [series, setSeries] = useState([]);

  const [options, setOptions] = useState({
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return "$" + y.toLocaleString("en");
        },
        tooltip: {
          enabled: true,
          y: {
            formatter: function (y) {
              return "$" + y.toLocaleString("en");
            },
          },
        },
      },
    },
  });


  useEffect(() => {
    setOptions({
      ...options,
      theme: {
        mode: "light",
      },
    });
  }, [darkMode]);

  const fetchCoin = async (coin) => {
    const res = await fetch(
      `https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=${coin}&quoteId=tether`
    );

    const result = await res.json();
    let coinData = result.data.slice(-90);

    coinData.forEach(function (d) {
      d.open = Math.round(d.open * 10000) / 10000;
      d.high = Math.round(d.high * 10000) / 10000;
      d.low = Math.round(d.low * 10000) / 10000;
      d.close = Math.round(d.close * 10000) / 10000;
    });

    let candlestickFormat = coinData.map(function (d) {
      return {
        x: new Date(d.period),
        y: [d.open, d.high, d.low, d.close],
      };
    });
    setSeries([{ data: candlestickFormat }]);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCoin(coin);
  }, [coin]);

  return (
    <div id="chart">
      {loading ? (
        <div>
          <article aria-busy="true">
            Fetching the chart data, please wait...
          </article>
        </div>
      ) : (
        <ReactApexChart options={options} series={series} type="candlestick" />
      )}
    </div>
  );
}

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
    const API_URL = import.meta.env.VITE_API_CANDLES;
    const url = `${API_URL}${coin}USDT&interval=1d`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      let coinData = data.slice(-90);

      coinData.forEach(function (d, i) {
        d.open = Math.round(d[1] * 10000) / 10000;
        d.high = Math.round(d[2] * 10000) / 10000;
        d.low = Math.round(d[3] * 10000) / 10000;
        d.close = Math.round(d[4] * 10000) / 10000;
        d.period = new Date(d[0]);
      });

      let candlestickFormat = coinData.map(function (d, i) {
        return {
          x: d.period,
          y: [d.open, d.high, d.low, d.close],
        };
      });

      setSeries([{ data: candlestickFormat }]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
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

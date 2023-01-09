import React, { useState } from "react";
import ApexChart from "../components/ReactApexChart";

export default function Charts() {
  const [coin, setCoin] = useState("BTC");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setCoin(value);
  };

  return (
    <div className="container">
      <article>
        <h3>Daily Charts</h3>
        <form className="grid">
          <select onChange={handleInputChange} name="coin" required>
            <option value="BTC">Bitcoin - Tether (BTC-USDT)</option>
            <option value="ETH">Ethereum - Tether (ETH-USDT)</option>
            <option value="BNB">
              Binance Coin - Tether (BNB-USDT)
            </option>
            <option value="BCH">
              Bitcoin Cash - Tether (BCH-USDT)
            </option>
            <option value="ADA">Cardano - Tether (ADA-USDT)</option>
            <option value="EOS">EOS - Tether (EOS-USDT)</option>
            <option value="DOT">Polkadot - Tether (DOT-USDT)</option>
            <option value="DOGE">Dogecoin - Tether (DOGE-USDT)</option>
          </select>
        </form>
      </article>
      <ApexChart coin={coin} />
    </div>
  );
}

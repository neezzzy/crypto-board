import React, { useState } from "react";
import ApexChart from "../components/ReactApexChart";

export default function Charts() {
  const [coin, setCoin] = useState("bitcoin");

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
            <option value="bitcoin">Bitcoin - Tether (BTC-USDT)</option>
            <option value="ethereum">Ethereum - Tether (ETH-USDT)</option>
            <option value="binance-coin">
              Binance Coin - Tether (BNB-USDT)
            </option>
            <option value="bitcoin-cash">
              Bitcoin Cash - Tether (BCH-USDT)
            </option>
            <option value="cardano">Cardano - Tether (ADA-USDT)</option>
            <option value="eos">EOS - Tether (EOS-USDT)</option>
            <option value="polkadot">Polkadot - Tether (DOT-USDT)</option>
            <option value="dogecoin">Dogecoin - Tether (DOGE-USDT)</option>
          </select>
        </form>
      </article>
      <ApexChart coin={coin} />
    </div>
  );
}

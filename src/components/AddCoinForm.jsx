import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function AddCoinForm({ handleSubmit }) {
  const initialValues = {
    coin: "bitcoin",
    fiat: "usd",
  };
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <article>
      <form className="grid">
        <select onChange={handleInputChange} name="coin" required>
          <option value="bitcoin">Bitcoin - (BTC)</option>
          <option value="ethereum">Ethereum - (ETH)</option>
          <option value="binancecoin">Binance Coin - (BNB)</option>
          <option value="ripple">Ripple - (XRP)</option>
          <option value="cardano">Cardano - (ADA)</option>
          <option value="solana">Solana - (SOL)</option>
          <option value="polkadot">Polkadot - (DOT)</option>
          <option value="dogecoin">Dogecoin - (DOGE)</option>
        </select>
        <select name="fiat" onChange={handleInputChange} required>
          <option value="usd">USD</option>
          <option value="cad">CAD</option>
        </select>
        <button onClick={(e) => handleSubmit(e, values)}>
          <AiOutlinePlusCircle size="3rem" />
        </button>
      </form>
    </article>
  );
}

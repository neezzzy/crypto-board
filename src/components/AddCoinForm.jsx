import React, { useState } from "react";
import { Form } from "react-bootstrap";
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
    <Form className="d-flex w-50 gap-3 align-items-center justify-content-center">
      <select
        onChange={handleInputChange}
        className="form-control-lg w-25"
        name="coin"
        required
      >
        <option value="bitcoin">Bitcoin - (BTC)</option>
        <option value="ethereum">Ethereum - (ETH)</option>
        <option value="binancecoin">Binance Coin - (BNB)</option>
        <option value="ripple">Ripple - (XRP)</option>
        <option value="cardano">Cardano - (ADA)</option>
        <option value="solana">Solana - (SOL)</option>
        <option value="polkadot">Polkadot - (DOT)</option>
        <option value="dogecoin">Dogecoin - (DOGE)</option>
      </select>
      <h1 className="text-white">/</h1>
      <select
        className="form-control-lg w-25"
        name="fiat"
        onChange={handleInputChange}
        required
      >
        <option value="usd">USD</option>
        <option value="cad">CAD</option>
      </select>
      <button
        className="bg-transparent border-0"
        onClick={(e) => handleSubmit(e, values)}
      >
        <AiOutlinePlusCircle size="3rem" className="w-10 h-6 text-white" />
      </button>
    </Form>
  );
}

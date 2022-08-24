import React from "react";
import { formatCurrency } from "../utils/formatCurrency";

export default function Card({
  current_price,
  symbol,
  image,
  price_change_percentage_24h,
  price_change_24h,
  handleDelete,
}) {
  return (
    <article>
      <header>
        <img src={image} className="coin-img" />
      </header>
      <h2>Ticker: {symbol}</h2>
      <div className="container">
        <h6>
          Price: <strong>{formatCurrency(current_price)}</strong>
        </h6>
        <h6>
          Price change: <strong>{price_change_percentage_24h}</strong>{" "}
        </h6>
        <h6>
          Price change 24hrs: <strong>{formatCurrency(price_change_24h)}</strong>
        </h6>
      </div>
      <button onClick={handleDelete} className="user-valid valid">
        Remove
      </button>
    </article>
  );
}

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
      <header className="img-container">
        <img src={image} className="coin-img" />
      </header>
      <h3>Ticker: {symbol}</h3>
      <div className="container">
        <p>
          Price: <strong>{formatCurrency(current_price)}</strong>
        </p>
        <p>
          Price Δ: <strong>{price_change_percentage_24h}</strong>{" "}
        </p>
        <p>
          Price Δ 24h: <strong>{formatCurrency(price_change_24h)}</strong>
        </p>
      </div>
      <div className="btn-holder">
        <button onClick={handleDelete} className="remove-btn">
          Remove
        </button>
      </div>
    </article>
  );
}

import React from "react";
import Button from "react-bootstrap/Button";
import { Card as BSCard } from "react-bootstrap";
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
    <div>
      <BSCard className="bg-dark text-white m-2 p-4 border-dark ">
        <BSCard.Img variant="top" className="rounded float-left w-25" src={image} />
        <BSCard.Body>
          <BSCard.Title>Ticker: {symbol}</BSCard.Title>
          <BSCard.Text>
            Price: {formatCurrency(current_price)}
            <br />
            Price change: {price_change_percentage_24h}
            <br />
            Price change 24hrs: {formatCurrency(price_change_24h)}
            <br />
          </BSCard.Text>
          <Button onClick={handleDelete} variant="primary">
            Remove
          </Button>
        </BSCard.Body>
      </BSCard>
    </div>
  );
}

import React, { useState, useId, useEffect } from "react";
import AddCoinForm from "../components/AddCoinForm";
import Card from "../components/Card";
import axios from "axios";

export default function Home() {
  const [error, setError] = useState("");
  const [cards, setCards] = useState(
    JSON.parse(window.localStorage.getItem("cards")) || []
  );

  const cardID = useId();

  useEffect(() => {
    window.localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleSubmit = async (event, values) => {
    event.preventDefault();
    const { coin, fiat } = values;

    if (cards.some((item) => coin === item.id)) {
      setError("coin already exists");
    } else {
      console.log("coin doesn't exists");
      const API_URL = import.meta.env.VITE_API_URL;
      if (coin) {
        const resp = await axios.get(
          `${API_URL}vs_currency=${fiat}&ids=${coin}`,
          {
            mode: "no-cors",
          }
        );

        const data = resp.data;
        setError("");
        if (data.length > 0) {
          setCards([
            ...cards,
            {
              id: data[0].id,
              coin: data[0].id,
              symbol: data[0].symbol,
              current_price: data[0].current_price,
              price_change_percentage_24h: data[0].price_change_percentage_24h,
              price_change_24h: data[0].price_change_24h,
              image: data[0].image,
            },
          ]);
        }
      }
    }
  };

  const handleDelete = (id) => {
    setCards(cards.filter((item) => item.id !== id));
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center align-items-center m-2">
        <AddCoinForm handleSubmit={handleSubmit} />
      </div>
      {error && (
        <span className="text-center p-2 text-danger bg-danger text-white font-weight-bold text-uppercase ">
          {error}
        </span>
      )}
      <div className="d-flex gap-2 flex-wrap justify-content-center align-items-center">
        {cards.map((item) => (
          <div key={cardID}>
            {
              <Card
                handleDelete={() => handleDelete(item.id)}
                coin={item.coin}
                symbol={item.symbol}
                current_price={item.current_price}
                price_change_percentage_24h={item.price_change_percentage_24h}
                price_change_24h={item.price_change_24h}
                image={item.image}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
}

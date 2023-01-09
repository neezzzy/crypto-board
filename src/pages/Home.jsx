import React, { useState, useEffect } from "react";
import AddCoinForm from "../components/AddCoinForm";
import Card from "../components/Card";
import axios from "axios";
import Search from "../components/Search";

export default function Home() {
  const [error, setError] = useState("");
  const [cards, setCards] = useState(
    JSON.parse(window.localStorage.getItem("cards")) || []
  );

  // const [cards, setCards] = useState([]);

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleSubmit = async (event, values) => {
    event.preventDefault();
    const { coin, fiat } = values;

    if (cards.some((item) => coin === item.id)) {
      setError("coin already exists");
    } else {
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

  const filteredCards = cards.filter((card) => {
    const filteredByCoin = card.coin
      .toLowerCase()
      .includes(query.toLowerCase());

    if (!query) {
      return card;
    }
    return filteredByCoin;
  });

  return (
    <div className="main container">
      <div>
        {error && <span className="error-message">{error}</span>}
        <AddCoinForm handleSubmit={handleSubmit} />

        <Search handleSearch={handleSearch} query={query} />
      </div>

      <div className="container main-cards-grid ">
        {filteredCards.map((item) => (
          <Card
            key={item.id}
            handleDelete={() => handleDelete(item.id)}
            coin={item.coin}
            symbol={item.symbol}
            current_price={item.current_price}
            price_change_percentage_24h={item.price_change_percentage_24h}
            price_change_24h={item.price_change_24h}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

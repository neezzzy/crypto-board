import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Wallet() {
  const [data, setData] = useState(null);
  const [wallet, setWallet] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_API_COVALENT;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  const handleChange = (e) => {
    setWallet(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
  }, []);

  const fetchData = async () => {
    const host = import.meta.env.VITE_API_HOST;
    const chainID = import.meta.env.VITE_API_CHAIN;
    const query = `${host}${chainID}/address/${wallet}/balances_v2/?quote-currency=USD&format=JSON&key=${API_KEY}`;
    setIsLoading(true);
    const resp = await axios.get(query, { mode: "no-cors" });
    setData(resp.data);
    setIsLoading(false);
  };

  return (
    <div className="container">
      {isLoading ? <h1>Loading ...</h1> : <h1>Wallet Balance</h1>}
      <form>
        <div className="container">
          <label htmlFor="wallet">
            <input
              type="text"
              id="wallet"
              placeholder="type your eth/bnb wallet address here..."
              value={wallet}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>Get Balance</button>
        </div>
      </form>
      {data != null ? (
        <table role="grid">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Coin</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.items.map((item, i) =>
              item.balance > 0 && item.balance !== "0" ? (
                <tr key={i}>
                  <td>{i}</td>
                  <td>
                    {item.contract_ticker_symbol}({item.contract_name})
                  </td>
                  <td>
                    {formatter.format(
                      parseFloat(item.balance * 0.000000000000000001)
                    )}
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}

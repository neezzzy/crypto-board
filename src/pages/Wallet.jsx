import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Wallet() {
  const [data, setData] = useState([]);
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
    <div className="d-flex w-100 flex-column ">
      <div className="p-2 m-2">
        {isLoading ? (
          <h1 className="font-weight-bold text-center text-uppercase">
            Loading ...
          </h1>
        ) : (
          <h1 className="font-weight-bold text-center text-uppercase">
            Wallet Balance
          </h1>
        )}
        <form className="w-100 d-flex justify-content-center align-items-center">
          <input
            className="p-2 m-2 w-25"
            type="text"
            placeholder="type your eth/bnb wallet address here..."
            value={wallet}
            onChange={handleChange}
          />
          <Button
            onClick={handleSubmit}
            variant="danger"
            className="btn p-2 m-2"
          >
            Get Balance
          </Button>
        </form>
        <ul class="list-group align-items-center justify-items-center">
          {data?.data?.items.map((item, i) =>
            item.balance > 0 && item.balance !== "0" ? (
              <li className="list-group-item d-flex w-50" key={i}>
                <h3 className="p-2 me-auto">
                  {item.contract_ticker_symbol}({item.contract_name}):
                </h3>
                <h3 className="p-2 text-muted">
                  {formatter.format(
                    parseFloat(item.balance * 0.000000000000000001)
                  )}
                </h3>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}

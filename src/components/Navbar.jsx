import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <strong>
            <Link to="/">Crypto Dashboard</Link>
          </strong>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/wallet">Wallet</Link>
        </li>
        <li>
          <Link to="/charts">Charts</Link>
        </li>
        <li>
          <ThemeSwitch />
        </li>
      </ul>
    </nav>
  );
}

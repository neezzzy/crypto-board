import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

export default function Navbar() {
  return (
    <nav className="container">
      <ul>
        <li>
          <strong>
            <Link to="/">Crypto Dashboard</Link>
          </strong>
        </li>
      </ul>

      <ul>
        <li>
          <CustomLink to="/">Home</CustomLink>
        </li>
        <li>
          <CustomLink to="/wallet">Wallet</CustomLink>
        </li>
        <li>
          <CustomLink to="/charts">Charts</CustomLink>
        </li>
        <li>
        <ThemeSwitch />
        </li>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

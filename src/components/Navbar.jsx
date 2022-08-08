import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link className="site-title" to="/">
        Crypto Dashboard
      </Link>
      <ul>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/wallet">Wallet</CustomLink>
          <CustomLink to="/charts">Charts</CustomLink>
  
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
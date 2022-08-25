import React from "react";

export default function Search({ handleSearch, query }) {
  return (
    <form className="container">
      <input
        onChange={(e) => handleSearch(e)}
        value={query}
        type="text"
        placeholder="Filter by coin name..."
      />
    </form>
  );
}

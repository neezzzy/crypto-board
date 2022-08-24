import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./hooks/useThemeContext";
import Charts from "./pages/Charts";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

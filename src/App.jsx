import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Charts from "./pages/Charts";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";


function App() {

  return (
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
  );
}

export default App;

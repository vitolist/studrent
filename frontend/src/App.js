import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Pocetna />} />
          <Route path="/prijava" element={<Prijava />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

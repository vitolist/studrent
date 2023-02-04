import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Pocetna />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

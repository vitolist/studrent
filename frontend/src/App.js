import { createContext, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate, redirect } from "react-router-dom";
import Main from "./components/Main";
import MojiNajmovi from "./components/MojiNajmovi";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";

const korisnik = {
  prijavljen: false
}

const KorisnikContext = createContext(korisnik);

function App() {

  return (
    <div className="App">
      <KorisnikContext.Provider value={korisnik}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Pocetna />} >
              <Route path="" element={<Main />} />
              <Route path="moji_najmovi" element={<MojiNajmovi />} />
            </Route>
            <Route path="/prijava" element={<Prijava />} />
            <Route path="/registracija" element={<Registracija />} />
            <Route path="/moji_najmovi" element={<MojiNajmovi />} />

          </Routes>
        </BrowserRouter>
      </KorisnikContext.Provider>
    </div>
  );
}

export default App;

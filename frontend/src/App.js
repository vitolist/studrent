import React, { createContext, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate, redirect } from "react-router-dom";
import Iznajmi from "./components/Iznajmi";
import Main from "./components/Main";
import MojiNajmovi from "./components/MojiNajmovi";
import Najam from "./components/Najam";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";

export const KorisnikContext = createContext();

function App() {

  const [korisnik, setKorisnik] = useState({});

  return (
    <div className="App">
      <KorisnikContext.Provider value={[korisnik, setKorisnik]}>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<Pocetna />} >
              <Route path="" element={<Main />} >
                <Route path="" element={<Iznajmi />} />
                <Route path="najam/:stan_id" element={<Najam />} />
              </Route>
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

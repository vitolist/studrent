import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate, redirect } from "react-router-dom";
import Chat from "./components/Chat";
import Iznajmi from "./components/Iznajmi";
import IzradaObjave from "./components/IzradaObjave";
import Main from "./components/Main";
import MojiNajmovi from "./components/MojiNajmovi";
import Najam from "./components/Najam";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";

// context varijable nam sluze da im mozemo pristupiti u bilo kojem dijelu aplikacije
export const KorisnikContext = createContext();
export const NajmoviContext = createContext();
export const OdabraniNajamContext = createContext();

function App() {

  const [korisnik, setKorisnik] = useState(JSON.parse(localStorage.getItem('korisnik')) || {});

  const [najmovi, setNajmovi] = useState([]);
  const [odabraniNajam, setOdabraniNajam] = useState([]);

  // osnovna struktura aplikacije, komponenta Browser odreduje rute
  return (
    <div className="App">
      <KorisnikContext.Provider value={[korisnik, setKorisnik]}>
        <NajmoviContext.Provider value={[najmovi, setNajmovi]}>
          <OdabraniNajamContext.Provider value={[odabraniNajam, setOdabraniNajam]}>
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<Pocetna />} >
                  <Route path="" element={<Main />} >
                    <Route path="" element={<Iznajmi />} />
                    <Route path="najam/:stan_id/:adresa_id" element={<Najam />} />
                  </Route>
                  <Route path="moji_najmovi" element={<MojiNajmovi />} />
                  <Route path="izrada_objave" element={<IzradaObjave />} />
                  <Route path="chat" element={<Chat />} />
                </Route>
                <Route path="/prijava" element={<Prijava />} />
                <Route path="/registracija" element={<Registracija />} />
                <Route path="/moji_najmovi" element={<MojiNajmovi />} />

              </Routes>
            </BrowserRouter>
          </OdabraniNajamContext.Provider>
        </NajmoviContext.Provider>
      </KorisnikContext.Provider>
    </div>
  );
}

export default App;

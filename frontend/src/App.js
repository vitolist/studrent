import React, { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, Navigate, redirect } from "react-router-dom";
import Iznajmi from "./components/Iznajmi";
import IzradaObjave from "./components/IzradaObjave";
import Main from "./components/Main";
import MojiNajmovi from "./components/MojiNajmovi";
import Najam from "./components/Najam";
import Pocetna from "./components/Pocetna";
import Prijava from "./components/Prijava";
import Registracija from "./components/Registracija";

export const KorisnikContext = createContext();
export const NajmoviContext = createContext();

function App() {

  const [korisnik, setKorisnik] = useState({});
  const [najmovi, setNajmovi] = useState([]);

  // useEffect(() => {
  //   setKorisnik({
  //     "id": 33,
  //     "ime": "Vito",
  //     "prezime": "List",
  //     "username": "vitolist",
  //     "lozinka": "8aa87050051efe26091a13dbfdf901c6",
  //     "broj_telefona": "12345",
  //     "spol": {
  //       "type": "Buffer",
  //       "data": [
  //         1
  //       ]
  //     },
  //     "datum_rodenja": "2005-11-06T23:00:00.000Z",
  //     "skola_id": 5,
  //     "profilna_id": 0,
  //     "email": null
  //   });
  // }, [])

  return (
    <div className="App">
      <KorisnikContext.Provider value={[korisnik, setKorisnik]}>
        <NajmoviContext.Provider value={[najmovi, setNajmovi]}>
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Pocetna />} >
                <Route path="" element={<Main />} >
                  <Route path="" element={<Iznajmi />} />
                  <Route path="najam/:stan_id" element={<Najam />} />
                </Route>
                <Route path="moji_najmovi" element={<MojiNajmovi />} />
                <Route path="izrada_objave" element={<IzradaObjave />} />
              </Route>
              <Route path="/prijava" element={<Prijava />} />
              <Route path="/registracija" element={<Registracija />} />
              <Route path="/moji_najmovi" element={<MojiNajmovi />} />

            </Routes>
          </BrowserRouter>
        </NajmoviContext.Provider>
      </KorisnikContext.Provider>
    </div>
  );
}

export default App;

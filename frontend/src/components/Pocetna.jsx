import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Prijava from './Prijava';
import provjera_prijave from './provjera_prijave';
import { KorisnikContext } from '../App';

const Pocetna = () => {
    const style = {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden"
    }

    const navigate = useNavigate();
    const [korisnik, setKorisnik] = useContext(KorisnikContext);

    // uvjetuje nas da se prijavimo ako nismo vec prijavljeni
    useEffect(() => {
        if (!provjera_prijave(korisnik)) {
            navigate("/prijava");
        }
    }, [korisnik]);

    return (
        <div style={style}>
            <Header />
            <Outlet />
            {/* <Main /> */}
        </div>
    )
}

export default Pocetna;
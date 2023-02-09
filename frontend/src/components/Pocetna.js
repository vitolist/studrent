import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate, Outlet } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Prijava from './Prijava';

const Pocetna = () => {
    const style = {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // overflow: "hidden"
    }

    return (
        <div style={style}>
            <Header />
            <Outlet />
            {/* <Main /> */}
        </div>
    )
}

export default Pocetna;
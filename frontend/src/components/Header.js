import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import { KorisnikContext } from '../App';
import ikona from "../icons/ikona.svg";

const Header = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const [index, setIndex] = useState(0);

    const selectedIndex = { "fontWeight": "700", "color": "#2667FF", "fontSize": "20px" };
    const notSelected = { "margin": "0 12px", "backgroundColor": "transparent", "outline": "none", "border": "none", "cursor": "pointer", "fontWeight": "500", "fontSize": "20px", "color": "#000" }

    useEffect(() => {

    }, [index]);

    return (
        <header>

            <img src={ikona} alt="" style={{ height: "28px", marginRight: "4px" }} />

            <h1>
                StudRent
            </h1>

            <input type="text"
                placeholder='Pretražite gradove'
            />
            <nav>
                <Link style={index == 0 ? selectedIndex : notSelected}
                    onClick={() => setIndex(0)} to={""}>Pronađi</Link>

                <Link style={index == 1 ? selectedIndex : notSelected}
                    onClick={() => setIndex(1)} to={"moji_najmovi"}>Moji najmovi</Link>

                <Link style={index == 2 ? selectedIndex : notSelected}
                    onClick={() => setIndex(2)} to={"chat"}>Chat</Link>
            </nav>
            <Link to={"/prijava"}><div className={styles.profilna}></div></Link>
            <span>ime: {korisnik["ime"]}</span>
        </header>
    )
}

export default Header;
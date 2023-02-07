import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'
import { KorisnikContext } from '../App';

const Header = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);

    let [index, setIndex] = useState(0);

    useEffect(() => {

    }, [index]);

    return (
        <header>

            <h1>
                StudRent
            </h1>

            <input type="text"
                placeholder='Pretražite gradove'
            />
            <nav>
                <Link onClick={() => setIndex(0)} to={""}>Pronađi</Link>
                <Link onClick={() => setIndex(1)} to={"moji_najmovi"}>Moji najmovi</Link>
                <Link onClick={() => setIndex(2)} to={""}>Chat</Link>
            </nav>
            <Link to={"/prijava"}><div className={styles.profilna}></div></Link>
            <span>ime: {korisnik["ime"]}</span>
        </header>
    )
}

export default Header;
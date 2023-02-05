import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'

const Header = () => {

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
                <Link onClick={() => setIndex(0)} to={""}>Iznajmi</Link>
                <Link onClick={() => setIndex(1)} to={"moji_najmovi"}>Moji najmovi</Link>
                <Link onClick={() => setIndex(2)} to={""}>Chat</Link>
            </nav>
            <Link to={"/registracija"}><div className={styles.profilna}></div></Link>
        </header>
    )
}

export default Header;
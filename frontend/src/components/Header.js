import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Header.module.css'

const Header = () => {
    return (
        <header>

            <h1>
                StudRent
            </h1>

            <input type="text"
                placeholder='Pretražite gradove'
            />
            <nav>
                <button>Iznajmi</button>
                <button>Moji najmovi</button>
                <button>Chat</button>
            </nav>
            <Link to={"/registracija"}><div className={styles.profilna}></div></Link>
        </header>
    )
}

export default Header;
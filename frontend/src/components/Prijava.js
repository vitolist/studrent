import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Prijava.module.css';

const Prijava = () => {
    return (
        <div className={styles.content}>
            <div className={styles.card}>
                <Link to={"/"} ><h1>StudRent</h1></Link>
                <form action="">
                    <input type="text" name="" id="" />
                </form>
            </div>
            <div className={styles.opis}>
            </div>
        </div>
    )
}

export default Prijava;
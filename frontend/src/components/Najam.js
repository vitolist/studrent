import React from 'react';
import styles from '../styles/Najam.module.css'

const Najam = ({ naslov, ulica, cijena }) => {
    return (
        <div className={styles.card}>
            <img src={require("../images/placeholder.png")} alt="" />
            <div className={styles.opis}>
                <span className={styles.naslov}>{naslov}</span>
                <span className={styles.ulica}>{ulica}</span>
                <span className={styles.cijena}>{cijena} €/mj.</span>
            </div>
        </div>
    )
}

export default Najam;
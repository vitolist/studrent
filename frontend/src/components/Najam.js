import React from 'react';
import styles from '../styles/Najam.module.css'

const Najam = () => {
    return (
        <div className={styles.card}>
            <img src={require("../images/placeholder.png")} alt="" />
            <div className={styles.opis}>
                <span className={styles.naslov}>Naslov najma</span>
                <span className={styles.ulica}>Ul. Ivana Gundulića 47</span>
                <span className={styles.cijena}>14.47 €/mj.</span>
            </div>
        </div>
    )
}

export default Najam;
import React from 'react';
import styles from '../styles/Iznajmi.module.css';
import Najam from './Najam';

const Iznajmi = () => {
    return (
        <div className={styles.content}>
            <div className={styles.traka}>
                <p>Najam u okolici</p>
            </div>

            <div className={styles.pretraga}>
                <div className={styles.popis}>
                    <Najam />
                    <Najam />
                    <Najam />
                    <Najam />
                    <Najam />
                    <Najam />
                    <Najam />
                    <Najam />
                    <Najam />
                </div>

                <div className={styles.filter}>
                </div>
            </div>
        </div>
    )
}

export default Iznajmi;
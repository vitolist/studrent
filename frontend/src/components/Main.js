import React from 'react';
import styles from '../styles/Main.module.css';
import Iznajmi from './Iznajmi';
import Mapa from './mapa/Mapa';

const Main = () => {

    return (
        <div className={styles.content}>
            <Mapa />
            <Iznajmi />
        </div>
    )
}

export default Main;
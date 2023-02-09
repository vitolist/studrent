import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Main.module.css';
import Iznajmi from './Iznajmi';
import Mapa from './mapa/Mapa';

const Main = () => {

    return (
        <div className={styles.content}>
            <Mapa />
            <Outlet />
            {/* <Iznajmi /> */}
        </div>
    )
}

export default Main;
import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Main.module.css';
import Iznajmi from './Iznajmi';
import Mapa from './mapa/Mapa';
import MapComponent from './MapComponent';

const Main = () => {

    // sadrzaj ispod Headera
    return (
        <div className={styles.content}>
            <MapComponent />
            <Outlet />
            {/* <Iznajmi /> */}
        </div>
    )
}

export default Main;
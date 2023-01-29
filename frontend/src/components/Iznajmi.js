import { React, useEffect, useState } from 'react';
import styles from '../styles/Iznajmi.module.css';
import Najam from './Najam';

const Iznajmi = () => {

    const [najmovi, setNajmovi] = useState([]);
    let n = [];
    const [ucitano, setUcitano] = useState(false);

    const ucitajNajmove = () => {
        for (let i = 0; i < 5; i++) {
            n.push(i);
            setNajmovi(n);
            // console.log(najmovi);
        }
        setUcitano(true);
    }

    useEffect(() => {
        ucitajNajmove();
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.traka}>
                <p>Najam u okolici</p>
            </div>

            <div className={styles.pretraga}>
                <div className={styles.popis}>
                    {/* <p>{ucitano.toString()}</p> */}
                    {/* {console.log(ucitano)} */}
                    {/* {console.log(najmovi)} */}
                    {najmovi.length > 0 ?
                        najmovi.map((item) => <Najam key={item.toString()} />) : <p>ucitavanje</p>}
                </div>

                <div className={styles.filter}>
                </div>
            </div>
        </div>
    )
}

export default Iznajmi;
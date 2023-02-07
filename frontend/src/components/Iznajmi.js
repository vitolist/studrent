import { React, useEffect, useState } from 'react';
import styles from '../styles/Iznajmi.module.css';
import Najam from './Najam';

const Iznajmi = () => {

    const [najmovi, setNajmovi] = useState({});
    const [ucitano, setUcitano] = useState(false);

    const ucitajNajmove = async () => {
        const najmoviJSON = await (await fetch("/dobi_stanove")).json();
        // console.log(najmoviJSON);

        setNajmovi(najmoviJSON.map(najam => ({
            id: najam["id"],
            naslov: "kuća",
            cijena: najam["cijena"],
            ulica: najam["ulica"],
        })
        ));
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
                    {ucitano ?
                        najmovi.map((najam) => <Najam
                            naslov={najam["naslov"]}
                            ulica={najam["ulica"]}
                            cijena={najam["cijena"]}
                            key={Math.random() * 1000} />) : <p>ucitavanje</p>}
                    {/* {ucitano && console.log(najmovi)} */}
                </div>

                <div className={styles.filter}>
                </div>
            </div>
        </div>
    )
}

export default Iznajmi;
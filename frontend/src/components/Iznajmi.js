import { React, useContext, useEffect, useState } from 'react';
import { NajmoviContext } from '../App';
import styles from '../styles/Iznajmi.module.css';
import Input from './Input';
import Najam from './NajamCard';

const Iznajmi = () => {

    const [najmovi, setNajmovi] = useContext(NajmoviContext);
    const [ucitano, setUcitano] = useState(false);
    const [filter, setFilter] = useState({});
    const [filtriranje, setFiltriranje] = useState(false);
    const [cijena, setCijena] = useState(500);

    // ucitavamo dostupne najmove
    const ucitajNajmove = async () => {
        const najmovi_json = await (await fetch("/dobi_stanove")).json();

        setNajmovi(najmovi_json.map(najam => ({
            id: najam["id"],
            naslov: "kuća",
            cijena: najam["cijena"],
            adresa_id: najam["adresa_id"],
            ulica: najam["ulica"],
            grad: najam["grad"],
            tv: parseInt(najam["tv"]["data"][0]),
            klima: parseInt(najam["klima"]["data"][0]),
            ljubimci: parseInt(najam["ljubimci"]["data"][0]),
        })));
        setUcitano(true);
    }

    // postavlja opcija filtera
    const postaviFilter = (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const f = {
            cijena: val.cijena.value,
            tv: val.tv.checked,
            klima: val.klima.checked,
            ljubimci: val.ljubimci.checked,
        };

        setFilter(f);
        setFiltriranje(true);
    }

    // provjerava svaki element najma zadovoljava uvjete filtra
    const filtriraj = (najam) => {
        if (!filtriranje) { return true }
        if (najam["tv"] != filter["tv"]
            || najam["klima"] != filter["klima"]
            || najam["ljubimci"] != filter["ljubimci"]
            || najam["cijena"] > cijena) { return false; }
        return true;
    }

    // ispis cijene kada se slider pomakne
    const cijenaChange = (e) => {
        setCijena(e.target.value);
    }

    // funkcija useEffect poziva se kada se komponenta rendera
    useEffect(() => {
        ucitajNajmove();
    }, []);

    return (
        <div className={styles.content}>
            {/* <div className={styles.traka}>
                <p>Najam u okolici</p>
            </div> */}

            <div className={styles.pretraga}>
                <div className={styles.popis}>
                    {/* prikazivanje svakog najma iz liste kao zasebnu Najam komponentu */}
                    {ucitano ?
                        najmovi.map((najam) =>
                        (filtriraj(najam) && <Najam
                            adresa_id={najam["adresa_id"]}
                            najam_id={najam["id"]}
                            naslov={najam["grad"]}
                            ulica={najam["ulica"]}
                            cijena={najam["cijena"]}
                            key={parseInt(najam["id"])}
                            karakteristike={[
                                ["tv", najam["tv"]], ["klima", najam["klima"]], ["ljubimci", najam["ljubimci"]]]
                            } />
                        )) : <p>ucitavanje</p>}
                    {/* {ucitano && console.log(najmovi)} */}
                </div>

                <div className={styles.filter}>
                    <form onSubmit={postaviFilter} action="">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label htmlFor="cijena">Cijena do: {cijena} €/mj.</label>
                            <input onChange={cijenaChange} type="range" min={0} max={1000} defaultValue={500} name='cijena' id='cijena' />
                        </div>
                        {/* <Input name="cijena" label="Cijena" type="range" /> */}
                        <Input name="klima" label="Klima" type="checkbox" />
                        <Input name="tv" label="TV" type="checkbox" />
                        <Input name="ljubimci" label="Ljubimci" type="checkbox" />

                        <input type="submit" value="Filtriraj" />
                    </form>
                    <button onClick={() => {
                        setFilter({});
                        setFiltriranje(false);
                    }}>Poništi filter</button>
                </div>
            </div>
        </div>
    )
}

export default Iznajmi;
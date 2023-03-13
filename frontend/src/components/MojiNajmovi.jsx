import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NajamCard from './NajamCard';
import { KorisnikContext } from '../App';
import styles from '../styles/MojiNajmovi.module.css';

const MojiNajmovi = () => {

    const navigate = useNavigate();
    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const [stanovi, setStanovi] = useState([]);
    const [najmovi, setNajmovi] = useState([]);
    const [stanari, setStanari] = useState([]);
    const [ucitano, setUcitano] = useState(false);

    // dohvaca sve stanove koje smo mi izradili
    const ucitajStanove = async () => {
        const stanovi_json = await (await fetch(`/moji_stanovi/${korisnik["id"]}`)).json();
        setStanovi(stanovi_json.map(stan => ({
            id: stan["id"],
            slika_url: stan["url"],
            cijena: stan["cijena"],
            ulica: stan["ulica"],
            broj: stan["broj"],
            grad: stan["grad"],
            // tv: parseInt(najam["tv"]["data"][0]),
            // klima: parseInt(najam["klima"]["data"][0]),
            // ljubimci: parseInt(najam["ljubimci"]["data"][0]),
        })));
    }

    // dohvaca sve stanove u cijem smo mi najmu
    const ucitajNajmove = async () => {
        const najmovi_json = await (await fetch(`/moji_najmovi/${korisnik["id"]}`)).json();
        setNajmovi(najmovi_json.map(stan => ({
            id: stan["stan_id"],
            slika_url: stan["url"],
            cijena: stan["cijena"],
            grad: stan["grad"],
            ulica: stan["ulica"],
            broj: stan["broj"],
        })));
    }

    // dohvaca sve stanare u nasim stanovima
    const ucitajStanare = async () => {
        const stanari_json = await (await fetch(`/moji_stanari/${korisnik["id"]}`)).json();
        setStanari(stanari_json.map(stanar => ({
            ime: stanar["ime"],
            prezime: stanar["prezime"],
            stan_id: stanar["stan_id"],
            cijena: stanar["cijena"],
        })));
    }

    useEffect(() => {
        setTimeout(() => {
            ucitajNajmove();
            ucitajStanove();
            ucitajStanare();
        }, 100);
    }, [korisnik]);

    return (
        <div className={styles.content}>
            {/* <div className={styles.popis}>
                <div>
                    Moji stanovi
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Cijena</th>
                                <th>Grad</th>
                                <th>Ulica</th>
                                <th>Broj</th>
                            </tr>
                            {stanovi.map(stan => (
                                <tr key={stan["id"]}>
                                    <td>{stan["id"]}</td>
                                    <td>{stan["cijena"]}</td>
                                    <td>{stan["grad"]}</td>
                                    <td>{stan["ulica"]}</td>
                                    <td>{stan["broj"]}</td>
                                </tr>
                            ))}</tbody>

                    </table>
                </div>

                <div>
                    Moji najmovi
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Cijena</th>
                                <th>Grad</th>
                                <th>Ulica</th>
                                <th>Broj</th>
                            </tr>
                            {najmovi.map((najam, i) => (
                                <tr key={i}>
                                    <td>{najam["id"]}</td>
                                    <td>{najam["cijena"]}</td>
                                    <td>{najam["grad"]}</td>
                                    <td>{najam["ulica"]}</td>
                                    <td>{najam["broj"]}</td>
                                </tr>
                            ))}</tbody>

                    </table>
                </div>
            </div> */}

            <div className={styles.najmovi}>
                <div className={styles.traka}>Najmovi u vlasništvu</div>

                <div className={styles.stupci}>
                    <div className={styles.popis}>
                        {stanovi.map((stan, index) => <NajamCard
                            slika_url={stan["slika_url"]}
                            key={index}
                            adresa_id={stan["adresa_id"]}
                            najam_id={stan["id"]}
                            naslov={stan["grad"]}
                            ulica={stan["ulica"]}
                            broj={stan["broj"]}
                            cijena={stan["cijena"]}
                            karakteristike={[
                                ["tv", stan["tv"]], ["klima", stan["klima"]], ["ljubimci", stan["ljubimci"]]]
                            } />)}
                    </div>
                    <div className={styles.tablica}>
                        <table cellSpacing={"0"}>
                            <tbody>
                                <tr>
                                    <th>Ime Prezime</th>
                                    <th>STAN_ID</th>
                                    <th>Cijena</th>
                                </tr>
                                {stanari.map((stanar, index) => (
                                    <tr key={index}>
                                        <td>{stanar["ime"]} {stanar["prezime"]}</td>
                                        <td>{stanar["stan_id"]}</td>
                                        <td>{stanar["cijena"]} €</td>
                                    </tr>
                                ))}</tbody>
                        </table>
                        <button onClick={() => {
                            navigate("/izrada_objave");
                        }}>Izradi objavu</button>
                    </div>
                </div>

            </div>

            <div>
                <div className={styles.iznajmljeno}>
                    <div className={styles.traka}>Iznajmljeno</div>
                    <div className={styles.popis}>
                        {najmovi.map((najam, index) => <NajamCard
                            slika_url={najam["slika_url"]}
                            key={index}
                            adresa_id={najam["adresa_id"]}
                            najam_id={najam["id"]}
                            naslov={najam["grad"]}
                            ulica={najam["ulica"]}
                            broj={najam["broj"]}
                            cijena={najam["cijena"]}
                            karakteristike={[
                                ["tv", najam["tv"]], ["klima", najam["klima"]], ["ljubimci", najam["ljubimci"]]]
                            } />)}
                    </div>
                </div>

                <div className={styles.lista}>
                    <div className={styles.traka}>Lista želja</div>
                    <div className={styles.popis}>
                        popis
                        popis
                        popis
                        popis
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MojiNajmovi;
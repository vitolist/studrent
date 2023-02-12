import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { KorisnikContext } from '../App';
import styles from '../styles/MojiNajmovi.module.css';
import Header from './Header';
import IzradaObjave from './IzradaObjave';

const MojiNajmovi = () => {

    const navigate = useNavigate();
    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const [stanovi, setStanovi] = useState([]);
    const [najmovi, setNajmovi] = useState([]);
    const [ucitano, setUcitano] = useState(false);

    // dohvaca sve stanove koje smo mi izradili
    const ucitajStanove = async () => {
        const stanovi_json = await (await fetch(`/moji_stanovi/${korisnik["id"]}`)).json();
        setStanovi(stanovi_json.map(stan => ({
            id: stan["id"],
            cijena: stan["cijena"],
            ulica: stan["ulica"],
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
            cijena: stan["cijena"],
            grad: stan["grad"],
            ulica: stan["ulica"],
        })));
    }

    useEffect(() => {
        setTimeout(() => {
            ucitajNajmove();
            ucitajStanove();
        }, 100);
    }, [korisnik]);

    return (
        <div className={styles.content}>
            <button onClick={() => {
                navigate("/izrada_objave");
            }}>Izradi objavu</button>

            <div className={styles.popis}>
                <div>
                    Moji stanovi
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Cijena</th>
                                <th>Ulica</th>
                            </tr>
                            {stanovi.map(stan => (
                                <tr key={stan["id"]}>
                                    <td>{stan["id"]}</td>
                                    <td>{stan["cijena"]}</td>
                                    <td>{stan["grad"]}</td>
                                    <td>{stan["ulica"]}</td>
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
                                <th>Ulica</th>
                            </tr>
                            {najmovi.map((najam, i) => (
                                <tr key={i}>
                                    <td>{najam["id"]}</td>
                                    <td>{najam["cijena"]}</td>
                                    <td>{najam["grad"]}</td>
                                    <td>{najam["ulica"]}</td>
                                </tr>
                            ))}</tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default MojiNajmovi;
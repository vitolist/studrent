import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KorisnikContext } from '../App';
import styles from "../styles/Najam.module.css";

const Najam = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const params = useParams();
    const navigate = useNavigate();
    const [poruka, setPoruka] = useState("");
    const [adresa, setAdresa] = useState({});
    const [stanari, setStanari] = useState([]);

    const iznajmi = async (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const podaci = {
            stan_id: params.stan_id,
            korisnik_id: korisnik["id"],
        };

        const stanje = await fetch(`/iznajmi/${podaci["stan_id"]}&${podaci["korisnik_id"]}&${1}`);
        setPoruka("Iznajmljeno! Prebacujemo vas na početnu");

        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    const dobiAdresu = async () => {
        const adresa_id = params.adresa_id;
        const adresa_json = await (await fetch(`/adresa_stana/${adresa_id}`)).json();
        setAdresa(adresa_json[0]);
        // console.log(adresa_json);
    }

    const dobiStanare = async () => {
        const stan_id = params.stan_id;
        const stanari_json = await (await fetch(`/stanari/${stan_id}`)).json();
        setStanari(stanari_json);
        // console.log(stanari_json);
    }

    useEffect(() => {
        dobiAdresu();
        dobiStanare();
    }, []);

    return (
        <div className={styles.content}>
            <h1>{adresa["grad"]}</h1>
            <span className={styles.ulica}>{adresa["ulica"]} {adresa["broj"]}</span>
            <div>
                <h3>Stanari: </h3>
                <div className={styles.stanari}>
                    {stanari.map((stanar, index) => <span key={index}>{stanar["ime"]} {stanar["prezime"]}</span>)}
                </div>
            </div>
            <button onClick={iznajmi}>Iznajmi</button>
            <p>{poruka}</p>
        </div>
    )
}

export default Najam;
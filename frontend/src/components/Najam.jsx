import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KorisnikContext } from '../App';
import styles from "../styles/Najam.module.css";

const Najam = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const params = useParams();
    const navigate = useNavigate();
    const [poruka, setPoruka] = useState("");
    const [stan, setStan] = useState({});
    const [stanari, setStanari] = useState([]);

    // zapisuje u bazu da smo iznajmili odredeni stan
    const iznajmi = async (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const podaci = {
            stan_id: params.stan_id,
            korisnik_id: korisnik["id"],
            aktivno: 1
        };

        // const stanje = await fetch(`/iznajmi/${podaci["stan_id"]}&${podaci["korisnik_id"]}&${1}`);
        const stanje = await fetch('/iznajmi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(podaci)
        })
            .then(response => {
            })
            .catch(error => {
            });
        setPoruka("Iznajmljeno! Prebacujemo vas na početnu");

        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    // dohvaca podatke o stanu
    const dobiAdresu = async () => {
        const stan_id = params.stan_id;
        console.log(stan_id);
        const stan_json = await (await fetch(`/o_stanu/${stan_id}`)).json();
        setStan(stan_json[0]);
        //console.log(stan_json[0]);
    }

    // dohvaca vec postojece stanare u stanu
    const dobiStanare = async () => {
        const stan_id = params.stan_id;
        const stanari_json = await (await fetch(`/stanari/${stan_id}`)).json();
        setStanari(stanari_json);
    }

    useEffect(() => {
        dobiAdresu();
        dobiStanare();
    }, []);

    return (
        <div className={styles.content}>
            <h1>{stan["grad"]}</h1>
            <span className={styles.ulica}>{stan["ulica"]} {stan["broj"]}</span>
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
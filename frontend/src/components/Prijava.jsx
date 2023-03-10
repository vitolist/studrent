import { React, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Prijava.module.css';
import Input from './Input';
import { KorisnikContext } from '../App';
import Mapa from './mapa/Mapa';

const Prijava = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const [greska, setGreska] = useState("");
    const navigate = useNavigate();

    // funkcija koja se pokrece kada submitamo formu za prijavu
    const handleSubmit = async (e) => {
        e.preventDefault();
        const podaci = {
            username: e.target.elements.username.value,
            lozinka: e.target.elements.lozinka.value,
        };

        const korisnikJSON = await (await fetch(`/prijava/${podaci["username"]}&${podaci["lozinka"]}`)).json();
        // const korisnikJSON = fetch('/prijava', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(podaci)
        // })
        //     .then(response => {
        //     })
        //     .catch(error => {
        //     });
        console.log(korisnikJSON);

        // provjerava ako je korisnicko ime ili lozinka krivo
        if (typeof korisnikJSON[0] !== "undefined") {
            setKorisnik(korisnikJSON[0]);
            localStorage.setItem('korisnik', JSON.stringify(korisnikJSON[0]));
            console.log(korisnikJSON[0]);
            navigate("/");
        } else {
            setGreska("Neispravno korisničko ime ili lozinka");
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.forma}>
                <Link to={"/"} ><h1>StudRent</h1></Link>
                <form onSubmit={handleSubmit} action="">
                    <Input name="username" placeholder="Upišite korisničko ime" label="Korisničko ime" />
                    <Input type={"password"} name="lozinka" placeholder="Upišite lozinku" label="Lozinka" />

                    <input type="submit" value="Prijavi se" />
                </form>
                <span>{greska}</span>
                <Link className={styles.link} to={"/registracija"}>Registracija</Link>
            </div>
            <div className={styles.opis}>
            </div>
        </div>
        // <Mapa />
    )
}

export default Prijava;
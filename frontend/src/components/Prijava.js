import { React, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Prijava.module.css';
import Input from './Input';
import { KorisnikContext } from '../App';

const Prijava = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const podaci = {
            username: e.target.elements.username.value,
            lozinka: e.target.elements.lozinka.value,
        };


        const korisnikJSON = await (await fetch(`/prijava/${podaci["username"]}&${podaci["lozinka"]}`)).json();
        console.log(korisnikJSON);

        setKorisnik(korisnikJSON[0]);
        console.log(korisnikJSON[0]);
        navigate("/");
    }

    return (
        <div className={styles.content}>
            <div className={styles.forma}>
                <Link to={"/"} ><h1>StudRent</h1></Link>
                <form onSubmit={handleSubmit} action="">
                    <Input name="username" placeholder="Upišite username" label="Username" />
                    <Input name="lozinka" placeholder="Upišite lozinku" label="Lozinka" />

                    <input type="submit" value="Prijavi se" />
                </form>
                <Link className={styles.link} to={"/registracija"}>Registracija</Link>
            </div>
            <div className={styles.opis}>
            </div>
        </div>
    )
}

export default Prijava;
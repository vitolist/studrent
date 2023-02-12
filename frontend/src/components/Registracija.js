import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Prijava.module.css';
import Input from './Input';

const Registracija = () => {

    // pokrece se prilikom submitanja forme, zapisuje podatke o korisniku u bazu
    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const podaci = {
            ime: val.ime.value,
            prezime: val.prezime.value,
            username: val.username.value,
            lozinka: val.lozinka.value,
            broj_telefona: val.broj_telefona.value,
            spol: val.spol.value,
            datum_rodenja: val.datum_rodenja.value,
            email: val.email.value,
        };
        console.log(podaci);

        const response = await fetch(`/korisnik/${podaci["ime"]}&${podaci["prezime"]}&${podaci["username"]}&${podaci["lozinka"]}&${podaci["broj_telefona"]}&${podaci["spol"]}&${podaci["datum_rodenja"]}&${5}&${null}&${podaci["email"]}`);

        console.log(await response.text())

        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].type != "submit") { e.target.elements[i].value = ""; }
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.forma}>
                <Link to={"/"} ><h1>StudRent</h1></Link>
                <form onSubmit={handleSubmit} action="">
                    <Input name="ime" placeholder="Upišite ime" label="Ime" />
                    <Input name="prezime" placeholder="Upišite prezime" label="Prezime" />
                    <Input name="username" placeholder="Upišite username" label="Korisničko ime" />
                    <Input name="email" placeholder="Upišite email" label="Email" />
                    <Input type={"password"} name="lozinka" placeholder="Upišite lozinku" label="Lozinka" />
                    <Input name="broj_telefona" placeholder="Upišite broj telefona" label="Broj telefona" type="number" />

                    <div className={styles.dodatni}>
                        <label htmlFor="spol">Spol</label>
                        <select name="spol" id="spol">
                            <option value="1">Muško</option>
                            <option value="0">Žensko</option>
                        </select>
                    </div>

                    <Input name='datum_rodenja' type="date" />

                    <input type="submit" value="Registriraj se" />
                </form>
                <Link className={styles.link} to={"/prijava"}>Prijava</Link>
            </div>
            <div className={styles.opis}>
            </div>
        </div>
    )
}

export default Registracija;
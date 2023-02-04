import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Prijava.module.css';
import Input from './Input';

const Registracija = () => {

    const handleSubmit = (e) => {
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
        };
        console.log(podaci);

        // fetch(`/dodajkorisnika/${podaci["ime"]}&${podaci["prezime"]}&${"user"}&${"lozinka"}&${"09944544"}&${1}&${Date.now()}&${2}&${3}`);
        fetch(`/dodajkorisnika/${podaci["ime"]}&${podaci["prezime"]}&${podaci["username"]}&${podaci["lozinka"]}&${podaci["broj_telefona"]}&${podaci["spol"]}&${podaci["datum_rodenja"]}&${1}&${1}`);

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
                    <Input name="username" placeholder="Upišite prezime" label="Korisničko ime" />
                    <Input name="lozinka" placeholder="Upišite prezime" label="Lozinka" />
                    <Input name="broj_telefona" placeholder="Upišite prezime" label="Broj telefona" />

                    <div className={styles.dodatni}>
                        <label htmlFor="spol">Spol</label>
                        <select name="spol" id="spol">
                            <option value="1">Muško</option>
                            <option value="0">Žensko</option>
                        </select>
                    </div>

                    <div>
                        <input className={styles.dodatni} name='datum_rodenja' type="date" />
                    </div>

                    <input type="submit" value="Prijavi se" />
                </form>
            </div>
            <div className={styles.opis}>
            </div>
        </div>
    )
}

export default Registracija;
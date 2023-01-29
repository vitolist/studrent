import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Prijava.module.css';
import Input from './Input';

const Prijava = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const podaci = {
            ime: e.target.elements.ime.value,
            prezime: e.target.elements.prezime.value,
        };
        console.log(podaci);

        fetch(`/dodajkorisnika/${podaci["ime"]}&${podaci["prezime"]}`);

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

                    <input type="submit" value="Prijavi se" />
                </form>
            </div>
            <div className={styles.opis}>
            </div>
        </div>
    )
}

export default Prijava;
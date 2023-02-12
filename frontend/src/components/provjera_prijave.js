import React, { useContext } from 'react';
import { KorisnikContext } from '../App';

const provjera_prijave = (korisnik) => {

    // provjerava je li korisnik vec prijavljen, varijabla korisnik sprema se u lokalnu memoriju browsera
    if (Object.keys(korisnik).length === 0) {
        return false;
    } else {
        return true;
    }
}

export default provjera_prijave;
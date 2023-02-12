import React, { useContext } from 'react';
import { KorisnikContext } from '../App';

const provjera_prijave = (korisnik) => {

    if (Object.keys(korisnik).length === 0) {
        return false;
    } else {
        return true;
    }
}

export default provjera_prijave;
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import NajamCard from './NajamCard';
import { KorisnikContext } from '../App';

const Najam = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const params = useParams();

    const iznajmi = async (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const podaci = {
            stan_id: params.stan_id,
            korisnik_id: korisnik["id"],
        };

        const stanje = await fetch(`/iznajmi/${podaci["stan_id"]}&${podaci["korisnik_id"]}&${1}`);
    }

    return (
        <div>
            <button onClick={iznajmi}>iznajmi</button>
        </div>
    )
}

export default Najam;
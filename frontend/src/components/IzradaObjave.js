import { React, useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/IzradaObjave.module.css';
import Input from './Input';
import { KorisnikContext } from '../App';
import MapComponent from './MapComponent';
import MapPrijava from './MapPrijava';

const IzradaObjave = () => {
    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null);

    const [sobe, setSobe] = useState([]);
    const sobeInput = useRef([0, 0, 0, 0, 0]);

    const dodajSobu = () => {
        if (sobe.length < 5) {
            setSobe([...sobe,
            <Input onChange={onChange} key={sobe.length} name={`soba${sobe.length + 1}`} label={`Kapacitet sobe ${sobe.length + 1}`} placeholder="Upišite kapacitet sobe" type="number" />]);
        }
        // console.log(sobe);
    }

    const makniSobu = () => {
        if (sobe.length > 0) {
            setSobe(sobe.filter((soba) => soba.key != sobe.length - 1));
        }
    }

    const onChange = (e) => {
        const value = e.target.value;
        const i = parseInt(e.currentTarget.name[4] - 1);
        sobeInput[i] = value;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const adresa = {
            grad_id: 1,
            ulica: val.ulica.value,
            grad: val.grad.value,
            broj: val.broj.value,
            lon: val.lon.value,
            lat: val.lat.value,
        };

        const stan = {
            kvadratura: val.kvadratura.value,
            broj_soba: sobe.length,
            broj_kuhinja: val.broj_kuhinja.value,
            broj_kupaona: val.broj_kupaona.value,
            cijena: val.cijena.value,
            klima: val.klima.checked ? 1 : 0,
            tv: val.tv.checked ? 1 : 0,
            ljubimci: val.ljubimci.checked ? 1 : 0,
        };

        // upis adrese
        const adresa_id = await (await fetch(`/adresa/${adresa["grad_id"]}&${adresa["ulica"]}&${adresa["grad"]}&${adresa["broj"]}&${adresa["lat"]}&${adresa["lon"]}`)).text();

        // upis karakteristika
        const karakteristike_id = await (await fetch(`/karakteristike/${stan["kvadratura"]}&${stan["broj_soba"]}&${stan["broj_kuhinja"]}&${stan["broj_kupaona"]}&${stan["klima"]}&${stan["tv"]}&${stan["ljubimci"]}`)).text();

        // upis stana
        const stan_id = await (await fetch(`/stan/${adresa_id}&${karakteristike_id}&${1}&${Date.now()}&${stan["cijena"]}`)).text();
        console.log("stan_id", stan_id)
        const vlasnistvo_id = await (await fetch(`/vlasnistvo/${stan_id}&${korisnik["id"]}&${1}`)).text();

        // upis soba
        let sobe_promises = [];
        let sobe_id = []
        let promises = []
        console.log("soba")
        for (let i = 0; i < sobe.length; i++) {
            sobe_promises.push((await fetch(`/sobe/${stan_id}`)).text());
            console.log(i, "soba")
        }
        Promise.all(sobe_promises).then((values) => {
            sobe_id = values;
            console.log(sobe_id);
            for (let i = 0; i < sobe.length; i++) {
                promises.push(fetch(`/tip_sobe/${sobe_id[i]}&${sobeInput[i]}&${0}`));
                console.log(i, "soba")
            }
        });
        Promise.all(promises);

        // for (let i = 0; i < e.target.elements.length; i++) {
        //     if (e.target.elements[i].type != "submit") { e.target.elements[i].value = ""; }
        // }
    }

    const onMapClick = (lon, lat) => {
        setLon(lon);
        setLat(lat);
    }

    return (
        <div className={styles.content}>
            <MapPrijava onMapClick={onMapClick} />
            <div className={styles.forma}>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <Input name="kvadratura" label="Kvadratura (m2)" placeholder="Upišite kvadraturu" type="number" />
                        <Input name="broj_kuhinja" label="Broj kuhinja" placeholder="Upišite broj kuhinja" type="number" />
                        <Input name="broj_kupaona" label="Broj kupaona" placeholder="Upišite broj kupaona" type="number" />
                        <Input name="cijena" label="Cijena" placeholder="Upišite cijenu" type="number" />
                        <Input name="klima" label="Klima" type="checkbox" />
                        <Input name="tv" label="TV" type="checkbox" />
                        <Input name="ljubimci" label="Ljubimci" type="checkbox" />

                        <input type="submit" value="Izradi objavu" />
                    </div>
                    <div>
                        <Input name="grad" label="Grad" placeholder="Upišite naziv grada" type="text" />
                        <Input name="ulica" label="Ulica" placeholder="Upišite ulicu" type="text" />
                        <Input name="broj" label="Kućni broj" placeholder="Upišite kućni broj" type="number" />

                        <Input value={lon} name="lon" label="Longitude" placeholder="Upišite longitude" type="number" step={0.00000000000001} />
                        <Input value={lat} name="lat" label="Latitude" placeholder="Upišite latitude" type="number" step={0.00000000000001} />
                    </div>
                    <div>
                        <button type='button' onClick={dodajSobu}>dodaj sobu</button>
                        <button type='button' onClick={makniSobu}>makni sobu</button>
                        {sobe.map(soba => soba)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IzradaObjave;
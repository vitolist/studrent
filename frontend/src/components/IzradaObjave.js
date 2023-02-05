import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/IzradaObjave.module.css';
import Input from './Input';

const IzradaObjave = () => {

    const [sobe, setSobe] = useState([]);
    const dodajSobu = () => {
        if (sobe.length < 5) {
            setSobe([...sobe,
            <Input key={sobe.length} name="kvadratura" label={`Kapacitet sobe ${sobe.length + 1}`} placeholder="Upišite kapacitet sobe" type="number" />]);
        }
    }

    const makniSobu = () => {
        if (sobe.length > 0) {
            setSobe(sobe.filter((soba) => soba.key != sobe.length - 1));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = e.target.elements;

        const adresa = {
            grad_id: 1,
            ulica: val.ulica.value,
            broj: val.broj.value,
        };

        const stan = {
            kvadratura: val.kv.value,
            broj_soba: sobe.length,
            broj_kuhinja: val.broj_kuhinja.value,
            broj_kupaona: val.broj_kupaona.value,
            klima: val.klima.checked ? 1 : 0,
            tv: val.tv.checked ? 1 : 0,
            ljubimci: val.ljubimci.checked ? 1 : 0,
        };
        console.log("k", val.kv.value);

        const adresa_id = await (await fetch(`/adresa/${adresa["grad_id"]}&${adresa["ulica"]}&${adresa["broj"]}`)).text();
        // console.log(adresa_id);

        console.log(stan)
        const karakteristike_id = await (await fetch(`/karakteristike/${stan["kvadratura"]}&${stan["broj_soba"]}&${stan["broj_kuhinja"]}&${stan["broj_kupaona"]}&${stan["klima"]}&${stan["tv"]}&${stan["ljubimci"]}`)).text();
        // console.log(karakteristike_id);

        await fetch(`/stan/${adresa_id}&${karakteristike_id}&${1}&${Date.now()}&${1}&${0.99}&${1}`);

        // for (let i = 0; i < e.target.elements.length; i++) {
        //     if (e.target.elements[i].type != "submit") { e.target.elements[i].value = ""; }
        // }
    }

    return (
        <div className={styles.content}>
            <div className={styles.forma}>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <Input name="kv" label="Kvadratura (m2)" placeholder="Upišite kvadraturu" type="number" />
                        <Input name="broj_kuhinja" label="Broj kuhinja" placeholder="Upišite broj kuhinja" type="number" />
                        <Input name="broj_kupaona" label="Broj kupaona" placeholder="Upišite broj kupaona" type="number" />
                        <Input name="klima" label="Klima" type="checkbox" />
                        <Input name="tv" label="TV" type="checkbox" />
                        <Input name="ljubimci" label="Ljubimci" type="checkbox" />

                        <input type="submit" value="Izradi objavu" />
                    </div>
                    <div>
                        <Input name="grad" label="Grad" placeholder="Upišite naziv grada" type="text" />
                        <Input name="ulica" label="Ulica" placeholder="Upišite ulicu" type="text" />
                        <Input name="broj" label="Kućni broj" placeholder="Upišite kućni broj" type="number" />
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
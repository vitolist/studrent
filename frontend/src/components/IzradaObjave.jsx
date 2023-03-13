import { React, useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/IzradaObjave.module.css';
import Input from './Input';
import { KorisnikContext } from '../App';
import MapComponent from './MapComponent';
import MapPrijava from './MapPrijava';
import upload_slike from '../images/upload_slike.png';

const IzradaObjave = () => {
    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const navigate = useNavigate();
    const [lon, setLon] = useState(null);
    const [lat, setLat] = useState(null);

    const [sobe, setSobe] = useState([]);
    const sobeInput = useRef([0, 0, 0, 0, 0]);

    // dodavanje i micanje inputa za sobu
    const dodajSobu = (e) => {
        e.preventDefault();
        if (sobe.length < 4) {
            setSobe([...sobe,
            <div className={styles.soba} key={sobe.length}>
                <h1>Soba {sobe.length + 1}</h1>
                <div>
                    <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor={`${sobe.length + 1}`}>Broj kreveta</label>
                    <input id={`${sobe.length + 1}`} type="number" min={1} max={100} />
                </div>
                <div>
                    <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor={`${sobe.length + 1}`}>Cijena sobe</label>
                    <input id={`${sobe.length + 1}`} type="number" min={0.99} max={999.99} />
                </div>
                <div>
                    <span>Cijena po osobi: 0€</span>
                </div>
            </div>]);
            // <Input onChange={onChange} key={sobe.length} name={`soba${sobe.length + 1}`} label={`Kapacitet sobe ${sobe.length + 1}`} placeholder="Upišite kapacitet sobe" type="number" />]);
        }
        // console.log(sobe);
    }

    const makniSobu = (e) => {
        e.preventDefault();
        if (sobe.length > 0) {
            setSobe(sobe.filter((soba) => soba.key != sobe.length - 1));
        }
    }

    const onChange = (e) => {
        const value = e.target.value;
        const i = parseInt(e.currentTarget.name[4] - 1);
        sobeInput[i] = value;
    }

    // funkcija se poziva kada submitamo formu
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

        const formData = new FormData();
        formData.append('image', e.target.slika.files[0]);
        const response = await fetch(`/slike_stana/${stan_id}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.text();
        console.log(data);


        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].type != "submit") { e.target.elements[i].value = ""; }
        }

        navigate("/moji_najmovi");

    }

    // postavljanje varijabli koordinata na vrijednosti dobivene prilikom pritiska na kartu
    const onMapClick = (lon, lat) => {
        setLon(lon);
        setLat(lat);
    }

    return (
        <div className={styles.content}>
            <form className={styles.forma}>
                {/* <h1>Iznajmi prostor</h1> */}
                <div className={styles.gore}>
                    <div className={styles.column}>
                        <div>
                            <label style={{ width: "128px" }} htmlFor="naziv">Naziv najma</label>
                            <input id='naziv' name='naziv' type={"text"} />
                        </div>

                        <div>
                            {/* <label style={{ display: "inline-block", textAlign: "left", width: "128px", verticalAlign: "top" }} htmlFor="opis">Kratki opis</label> */}
                            <label style={{ width: "128px" }} htmlFor="opis">Kratki opis</label>
                            <textarea id='opis' name='opis' />
                        </div>

                        <div>
                            <label style={{ width: "128px" }} htmlFor="stan">Vrsta prostora</label>

                            <input id='stan' name='prostor' type={"radio"} />

                            <label style={{ width: "128px" }} htmlFor="stan">stan</label>

                            <input id='kuca' name='prostor' type={"radio"} />

                            <label style={{ width: "128px" }} htmlFor="kuca">kuća</label>
                        </div>

                        <div>
                            <label style={{ width: "128px" }} htmlFor="zupanija">Županija</label>
                            <select name="zupanija" id="zupanija">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="grad">Grad/Općina</label>
                            <select name="grad" id="grad">
                                <option value="cakovec">cakovec</option>
                                <option value="varazdin">varazdin</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="adresa">Adresa</label>
                            <input id='adresa' name='adresa' type={"text"} />
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="sobe">Broj soba</label>
                            <input id='sobe' name='sobe' type={"number"} />
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="cijena">Ukupna cijena</label>
                            <input id='cijena' name='cijena' type={"number"} />
                        </div>
                        <button onClick={dodajSobu}>dodaj</button>
                        <button onClick={makniSobu}>makni</button>
                    </div>

                    <div className={styles.column}>
                        <h1>Općenito</h1>
                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="kuhinja">Kuhinja</label>
                            <select name="kuhinja" id="kuhinja">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="grijanje">Grijanje</label>
                            <select name="grijanje" id="grijanje">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="kupaona">Kupaona</label>
                            <select name="kupaona" id="kupaona">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="rezije">Režije</label>
                            <select name="rezije" id="rezije">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="dnevna_soba">Dnevna soba</label>
                            <select name="dnevna_soba" id="dnevna_soba">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="kat">Kat</label>
                            <select name="kat" id="kat">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: "inline-block", textAlign: "left", width: "128px" }} htmlFor="balkon">Balkon</label>
                            <select name="balkon" id="balkon">
                                <option value="medimurska">medimurska</option>
                                <option value="varazdinska">varazdinska</option>
                            </select>
                        </div>
                        <h1>Fotografija</h1>
                        <label htmlFor="slika" className={styles.slika} >
                            <img src={upload_slike} alt="" />
                        </label>
                        <input style={{ display: "none" }} type="file" name="slika" id="slika" accept="image/jpeg, image/png" />
                    </div>

                    <div className={styles.column}>
                        <h1>Karakteristike</h1>
                        <div>
                            <input id='ljubimci' name='ljubimci' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="ljubimci">kućni ljubimci</label>
                        </div>

                        <div>
                            <input id='klima' name='klima' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="klima">klima</label>
                        </div>

                        <div>
                            <input id='tv' name='tv' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="tv">TV</label>
                        </div>

                        <div>
                            <input id='wifi' name='wifi' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="wifi">WI-FI</label>
                        </div>

                        <div>
                            <input id='perilica_odjece' name='perilica_odjece' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="perilica_odjece">perilica odjeće</label>
                        </div>

                        <div>
                            <input id='perilica_suda' name='perilica_suda' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="perilica_suda">perilica suđa</label>
                        </div>

                        <div>
                            <input id='dvoriste' name='dvoriste' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="dvoriste">dvorište/vrt</label>
                        </div>

                        <div>
                            <input id='bicikl_spremiste' name='bicikl_spremiste' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="bicikl_spremiste">spremište za bicikl</label>
                        </div>

                        <div>
                            <input id='parking' name='parking' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="parking">parking</label>
                        </div>

                        <div>
                            <input id='lift' name='lift' type={"checkbox"} />
                            <label style={{ display: "inline-block", textAlign: "left", width: "auto", marginLeft: "4px" }} htmlFor="lift">lift</label>
                        </div>
                    </div>

                </div>

                <div className={styles.divider} />

                <div className={styles.dole}>

                    <div className={styles.sobe}>
                        {/* <div className={styles.soba}></div> */}
                        {sobe.map(soba => soba)}
                    </div>

                    <div className={styles.mapa}>
                        <MapPrijava onMapClick={onMapClick} />
                    </div>

                </div>
            </form>

            {/* <MapPrijava onMapClick={onMapClick} />
            <div className={styles.forma}>
                <form onSubmit={handleSubmit} action="">
                    <div>
                        <Input name="kvadratura" label="Kvadratura (m2)" placeholder="Upišite kvadraturu" type="number" />
                        <Input name="broj_kuhinja" label="Broj kuhinja" placeholder="Upišite broj kuhinja" type="number" />
                        <Input name="broj_kupaona" label="Broj kupaona" placeholder="Upišite broj kupaona" type="number" />
                        <Input name="cijena" label="Cijena" placeholder="Upišite cijenu" type="number" step={0.01} />
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

                        <input type="file" name="slika" id="slika" accept="image/jpeg, image/png" />
                    </div>
                    <div>
                        <button type='button' onClick={dodajSobu}>dodaj sobu</button>
                        <button type='button' onClick={makniSobu}>makni sobu</button>
                        {sobe.map(soba => soba)}
                    </div>
                </form>
            </div> */}
        </div>
    )
}

export default IzradaObjave;
import { React, useEffect, useState, useContext } from 'react';
import MapPrijava from './MapPrijava';
import styles from '../styles/Chat.module.css';
import { KorisnikContext } from '../App';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {

    const [korisnik, setKorisnik] = useContext(KorisnikContext);
    const [poruke, setPoruke] = useState([]);
    const [ucitano, setUcitano] = useState(false);
    const kontakt = korisnik["id"] == 33 ? 36 : 33;

    const ucitajPoruke = async () => {
        const poruke_json = await (await fetch(`poruke/${korisnik["id"]}&${kontakt}`)).json();
        setPoruke(poruke_json.map(poruka => poruka));
        // console.log(poruke_json);

        setUcitano(true);
    }

    const posalji = async (e) => {
        e.preventDefault();

        const val = e.target.elements;
        const date = new Date();

        const podaci = {
            primatelj_id: kontakt,
            posiljatelj_id: korisnik["id"],
            sadrzaj: val.poruka.value,
            vrijeme: date.toISOString().substring(0, 19).replace('T', ' '),
        }

        await fetch('/poruka', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(podaci)
        });
        // .then(response => response.json())
        // .then(data => data.insertId);

        ucitajPoruke();
        e.target.poruka.value = "";
    }

    useEffect(() => {
        ucitajPoruke();
        socket.on('poruka', ucitajPoruke);
    }, []);

    return (
        <div className={styles.content}>
            <h1>Chat dolazi uskoro...</h1>
            <div className={styles.poruke}>
                {ucitano ? poruke.map((poruka, index) =>
                    <div key={index} className={`${poruka["posiljatelj_id"] == korisnik["id"] ? styles.poslana : styles.primljena} ${styles.poruka}`}><div className={styles.sadrzaj}>{poruka["sadrzaj"]}</div></div>
                ) : <p>učitavanje...</p>}
            </div>
            <form onSubmit={posalji} action="">
                <input name='poruka' type="text" />
                <input type="submit" value="Pošalji" />
            </form>
        </div>
    )
}

export default Chat;
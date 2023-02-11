import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NajamCard.module.css'

const NajamCard = ({ najam_id, naslov, ulica, cijena, karakteristike, adresa_id }) => {

    const navigate = useNavigate();

    const otvoriNajam = () => {
        navigate(`najam/${najam_id}/${adresa_id}`)
    }

    return (
        <div onClick={otvoriNajam} className={styles.card}>
            <img src={require("../images/placeholder.png")} height={120} alt="" />
            <div className={styles.opis}>
                <span className={styles.naslov}>{naslov}</span>
                <span className={styles.ulica}>{ulica}</span>
                <div>
                    {karakteristike.map((k, index) => k[1] != 0 && <span key={index}>{k[0]}</span>)}
                </div>
                <span className={styles.cijena}>{cijena} €/mj.</span>
            </div>
        </div>
    )
}

export default NajamCard;
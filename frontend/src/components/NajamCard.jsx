import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NajamCard.module.css';

const NajamCard = ({ najam_id, naslov, ulica, broj, cijena, karakteristike, adresa_id, slika_url }) => {

    const navigate = useNavigate();

    // otvara tab s opisom najma
    const otvoriNajam = () => {
        navigate(`najam/${najam_id}/${adresa_id}`)
    }

    return (
        <div onClick={otvoriNajam} className={styles.card}>
            <img src={require(`../../../uploads/${slika_url}`)} height={120} width={120} alt="" />
            <div className={styles.opis}>
                <span className={styles.naslov}>{naslov}</span>
                <span className={styles.ulica}>{ulica} {broj}</span>
                <div>
                    {karakteristike.map((k, index) => k[1] != 0 && <span key={index}>{k[0]}</span>)}
                </div>
                <span className={styles.cijena}>{cijena} €/mj.</span>
            </div>

        </div>
    )
}

export default NajamCard;
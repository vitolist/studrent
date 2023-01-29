import React from 'react';
import styles from '../styles/Prijava.module.css';

const Input = ({ name, label, placeholder }) => {
    return (
        <div className={styles.input}>
            {label != "" && <label htmlFor={name}>{label}</label>}
            <input type="text" name={name} id={name} placeholder={placeholder} />
        </div>
    )
}

export default Input;
import React from 'react';
import styles from '../styles/Prijava.module.css';

const Input = ({ name, label, placeholder, type }) => {
    return (
        <div className={styles.input}>
            {label != "" && <label htmlFor={name}>{label}</label>}
            <input type={type} name={name} id={name} placeholder={placeholder} />
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    placeholder: ""
}

export default Input;
import React from 'react';
import styles from '../styles/Prijava.module.css';

const Input = ({ name, label, placeholder, type, onChange, step, value }) => {
    return (
        <div className={styles.input}>
            {label != "" && <label htmlFor={name}>{label}</label>}
            <input defaultValue={value}
                step={step}
                onChange={onChange} type={type} name={name} id={name} placeholder={placeholder} />
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    placeholder: "",
    step: 1,
    value: ""
}

export default Input;
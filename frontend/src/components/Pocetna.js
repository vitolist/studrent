import React from 'react';
import Header from './Header';
import Main from './Main';

const Pocetna = () => {
    const style = {
        height: "100vh"
    }

    return (
        <div style={style}>
            <Header />
            <Main />
        </div>
    )
}

export default Pocetna;
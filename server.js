const express = require("express");
const mysql = require("mysql");
const md5 = require("md5");

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "vito",
    password: "micko",
    database: "studrent"
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("mysql connected");
});

app.get("/proba", (req, res) => {
    res.send(md5("proba"));
});

// dodaj korisnika
app.get("/korisnik/:ime&:prezime&:username&:lozinka&:broj_telefona&:spol&:datum_rodenja&:skola_id&:profilna_id", (req, res) => {
    let post = {
        ime: req.params.ime,
        prezime: req.params.prezime,
        username: req.params.username,
        lozinka: md5(req.params.lozinka),
        broj_telefona: req.params.broj_telefona,
        spol: parseInt(req.params.spol),
        datum_rodenja: req.params.datum_rodenja,
        skola_id: req.params.skola_id,
        profilna_id: req.params.profilna_id,
    }
    console.log(req.params);

    let sql = "INSERT INTO korisnik SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("dodan korisnik...");
    });
});

// dodaj adresu
app.get("/adresa/:grad_id&:ulica&:broj", (req, res) => {
    const r = req.params;

    const post = {
        grad_id: r.grad_id,
        ulica: r.ulica,
        broj: r.broj
    }

    let sql = "INSERT INTO adresa SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send(`${result.insertId}`);
        console.log(result);
    });
});

// dodaj karakteristike
app.get("/karakteristike/:kvadratura&:broj_soba&:broj_kuhinja&:broj_kupaona&:klima&:tv&:ljubimci", (req, res) => {
    const r = req.params;

    const post = {
        kvadratura: parseInt(r.kvadratura),
        broj_soba: parseInt(r.broj_soba),
        broj_kuhinja: parseInt(r.broj_kuhinja),
        broj_kupaona: parseInt(r.broj_kupaona),
        klima: parseInt(r.klima),
        tv: parseInt(r.tv),
        ljubimci: parseInt(r.ljubimci),
    }

    let sql = "INSERT INTO karakteristike SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send(`${result.insertId}`);
        console.log(result);
    });
});

// dodaj stan i vlasnistvo
app.get("/stan/:adresa_id&:karakteristike_id&:aktivan&:vrijeme_objave&:vlasnik_id&:cijena&:aktivno", (req, res) => {
    const r = req.params;

    let post_stan = {
        adresa_id: r.adresa_id,
        karakteristike_id: r.karakteristike_id,
        aktivan: parseInt(r.aktivan),
        vrijeme_objave: parseInt(r.vrijeme_objave),
    }

    let stan_id = null;
    let sql_stan = "INSERT INTO stan SET ?";
    db.query(sql_stan, post_stan, (err, result) => {
        if (err) throw err;
        stan_id = result.insertId;
        res.send(`${result.insertId}`);
        console.log(result);
    });

    // TODO
    let post_vlas = {
        stan_id: stan_id,
        vlasnik_id: r.vlasnik_id,
        cijena: parseFloat(r.cijena),
        aktivno: parseInt(r.aktivno),
    }

    let sql_vlas = "INSERT INTO vlasnistvo SET ?";
    db.query(sql_vlas, post_vlas, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
});

const PORT = 5000;

app.listen(PORT, () => { console.log(`server radi na portu ${PORT}`); });
//ZbV1T4@l9bynTAv

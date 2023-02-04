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

app.get("/korisnik", (req, res) => {
    let sql = "CREATE TABLE KORISNIK(id int AUTO_INCREMENT, ime VARCHAR(255), prezime VARCHAR(255), PRIMARY KEY(id))";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("korsnik table created...");
    });
});

app.get("/proba", (req, res) => {
    res.send(md5("proba"));
});

app.get("/dodajkorisnika/:ime&:prezime&:username&:lozinka&:broj_telefona&:spol&:datum_rodenja&:skola_id&:profilna_id", (req, res) => {
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

const PORT = 5000;

app.listen(PORT, () => { console.log(`server radi na portu ${PORT}`); });
//ZbV1T4@l9bynTAv

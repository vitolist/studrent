const express = require("express");
const mysql = require("mysql");

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

app.get("/dodajkorisnika/:ime&:prezime", (req, res) => {
    let post = {
        ime: req.params.ime,
        prezime: req.params.prezime
    }
    console.log(req.params);
    let sql = "INSERT INTO korisnik SET ?";
    let query = db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("dodan korisnik...");
    });
});

const PORT = 5000;

app.listen(PORT, () => { console.log(`server radi na portu ${PORT}`); });


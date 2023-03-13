const express = require("express");
const mysql = require("mysql");
const md5 = require("md5");
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');






const app = express();
app.use(bodyParser.json());

const server = http.createServer(app)
const io = socketio(server, {
    cors: { origin: "*" }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'podrska.studrent@gmail.com',
        pass: 'wrqvazievupjjkyi'
    }
});

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });







// upisi sliku stana
app.post('/slike_stana/:stan_id', upload.single('image'), (req, res) => {
    const file = req.file.filename;
    let sql = `INSERT INTO slike_stana (stan_id, url) VALUES (${req.params.stan_id}, '${file}')`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('Slika je uploadana');
    });
});

app.get("/poruke/:korisnik_id&:kontakt_id", (req, res) => {

    const korisnik = req.params.korisnik_id;
    const kontakt = req.params.kontakt_id;
    console.log(korisnik, kontakt)

    let sql = `SELECT sadrzaj, vrijeme, posiljatelj_id, primatelj_id FROM poruka, chat WHERE chat.poruka_id=poruka.id AND ((posiljatelj_id=${korisnik} AND primatelj_id=${kontakt}) OR (posiljatelj_id=${kontakt} AND primatelj_id=${korisnik})) ORDER BY vrijeme`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

function dodajPoruku(sadrzaj, vrijeme) {
    return new Promise((resolve, reject) => {

        const sql = `INSERT INTO poruka (sadrzaj, vrijeme) VALUES ('${sadrzaj}', '${vrijeme}')`;
        db.query(sql, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.insertId);
            }
        });
    });
}

app.post('/poruka', async (req, res) => {
    const sadrzaj = req.body["sadrzaj"];
    const vrijeme = req.body["vrijeme"];
    // console.log(sadrzaj, vrijeme)

    const poruka_id = await dodajPoruku(sadrzaj, vrijeme);
    // console.log(poruka_id);

    post = {
        poruka_id: poruka_id,
        posiljatelj_id: req.body["posiljatelj_id"],
        primatelj_id: req.body["primatelj_id"],
    }

    db.query(`INSERT INTO chat SET ?`, post, (err, result) => {
        if (err) {
            throw err;
        }
        io.emit('poruka');
    });
});

// dobi slike stana
app.get("/dobi_slike/:stan_id", (req, res) => {
    let sql = `SELECT * FROM slike_stana WHERE stan_id=${req.params.stan_id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get("/proba", (req, res) => {
    let sql = "SELECT * FROM korisnik LIMIT 1";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

// dodaj korisnika
// app.get("/korisnik/:ime&:prezime&:username&:lozinka&:broj_telefona&:spol&:datum_rodenja&:skola_id&:profilna_id&:email", (req, res) => {
//     const r = req.params;

//     let post = {
//         ime: r.ime,
//         prezime: r.prezime,
//         username: r.username,
//         lozinka: md5(r.lozinka),
//         broj_telefona: r.broj_telefona,
//         spol: parseInt(r.spol),
//         datum_rodenja: r.datum_rodenja,
//         skola_id: r.skola_id,
//         profilna_id: r.profilna_id,
//         email: r.email,
//     }
//     console.log(req.params);

//     let sql = "INSERT INTO korisnik SET ?";
//     db.query(sql, post, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         res.send("dodan korisnik...");
//     });

//     // var mailOptions = {
//     //     from: 'podrska.studrent@gmail.com',
//     //     to: 'vito.list2005@gmail.com',
//     //     subject: 'Prijava',
//     //     text: `${post["ime"]} ${post["prezime"]} se registrirao!`
//     // };

//     // transporter.sendMail(mailOptions, function (error, info) {
//     //     if (error) {
//     //         console.log(error);
//     //     } else {
//     //         console.log('Email sent: ' + info.response);
//     //     }
//     // });
// });

app.post("/registracija", (req, res) => {

    let post = req.body;
    post["lozinka"] = md5(post["lozinka"]);
    console.log(post);

    let sql = "INSERT INTO korisnik SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    var mailOptions = {
        from: 'podrska.studrent@gmail.com',
        to: 'vito.list2005@gmail.com',
        subject: 'Prijava',
        text: `${post["ime"]} ${post["prezime"]} se registrirao!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
});

// prijava
// TODO post
app.get("/prijava/:username&:lozinka", (req, res) => {
    const r = req.params;

    const username = r.username;
    const lozinka = md5(r.lozinka);

    let sql = `SELECT * FROM korisnik WHERE username="${username}" AND lozinka="${lozinka}"`;
    console.log(`prijava ${username}`);
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});
// dodaj adresu
// TODO post
app.get("/adresa/:grad_id&:ulica&:grad&:broj&:lon&:lat", (req, res) => {
    const r = req.params;

    const post = {
        grad_id: r.grad_id,
        ulica: r.ulica,
        grad: r.grad,
        broj: r.broj,
        lon: parseFloat(r.lon),
        lat: parseFloat(r.lat)
    }

    let sql = "INSERT INTO adresa SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send(`${result.insertId}`);
        // console.log(result);
    });
});

// dodaj karakteristike
// TODO post
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
        // console.log(result);
    });
});

// dodaj stan
// TODO post
app.get("/stan/:adresa_id&:karakteristike_id&:aktivan&:vrijeme_objave&:cijena", (req, res) => {
    const r = req.params;

    let post_stan = {
        adresa_id: r.adresa_id,
        karakteristike_id: r.karakteristike_id,
        aktivan: parseInt(r.aktivan),
        vrijeme_objave: parseInt(r.vrijeme_objave),
        cijena: parseFloat(r.cijena),
    }

    let sql_stan = "INSERT INTO stan SET ?";
    db.query(sql_stan, post_stan, (err, result) => {
        if (err) throw err;

        res.send(`${result.insertId}`);
        // console.log(result);
    });
});

// dodaj vlasnistvo
// TODO post
app.get("/vlasnistvo/:stan_id&:vlasnik_id&:aktivno", (req, res) => {
    const r = req.params;

    let post = {
        stan_id: r.stan_id,
        vlasnik_id: r.vlasnik_id,
        aktivno: parseInt(r.aktivno),
    }

    console.log(post);

    let sql = "INSERT INTO vlasnistvo SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send(`${result.insertId}`);
        // console.log(result);
    });
});

// dodaj sobe
// TODO post
app.get("/sobe/:stan_id", (req, res) => {
    const r = req.params;

    let sql = `INSERT INTO sobe (stan_id) VALUES (${r.stan_id})`;
    db.query(sql, (err, result) => {
        if (err)
            throw err;

        res.send(`${result.insertId}`);
    });
});

// dodaj tip sobe
// TODO post
app.get("/tip_sobe/:soba_id&:kapacitet&:popunjenost", (req, res) => {
    const r = req.params;

    let post = {
        soba_id: r.soba_id,
        kapacitet: parseInt(r.kapacitet),
        popunjenost: parseInt(r.popunjenost),
    }

    let sql = "INSERT INTO tip_sobe SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        // console.log(result);
    });
});

// dobi stanove
app.get("/dobi_stanove", (req, res) => {

    let sql = "SELECT stan.id, adresa_id, tv, klima, ljubimci, grad, ulica, broj, cijena, url FROM stan, adresa, karakteristike, slike_stana WHERE adresa.id=stan.adresa_id AND stan.karakteristike_id=karakteristike.id AND stan.aktivan=1 AND slike_stana.stan_id=stan.id";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// iznajmi
app.post("/iznajmi", (req, res) => {
    let post = req.body;
    let sql = "INSERT INTO najam SET ?";
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        res.send(200);
    });

});

// moji stanovi
app.get("/moji_stanovi/:vlasnik_id", (req, res) => {

    const vlasnik_id = req.params.vlasnik_id;

    let sql = `SELECT stan.id, grad, cijena, ulica, broj, klima, tv, ljubimci, url FROM stan, adresa, karakteristike, vlasnistvo, slike_stana WHERE adresa.id=stan.adresa_id AND stan.karakteristike_id=karakteristike.id AND vlasnistvo.stan_id=stan.id AND vlasnistvo.vlasnik_id=${vlasnik_id} AND slike_stana.stan_id=stan.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// moji najmovi
app.get("/moji_najmovi/:korisnik_id", (req, res) => {

    const korisnik_id = req.params.korisnik_id;

    let sql = `SELECT najam.stan_id, grad, cijena, ulica, broj, url FROM najam, stan, adresa, slike_stana WHERE najam.korisnik_id=${korisnik_id} AND stan.id=najam.stan_id AND stan.adresa_id=adresa.id AND slike_stana.stan_id=stan.id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// koordinate
app.get("/koordinate", (req, res) => {
    let sql = "SELECT stan.id, stan.adresa_id, adresa.lon, adresa.lat FROM stan, adresa WHERE stan.adresa_id=adresa.id";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// adresa stana
app.get("/adresa_stana/:id", (req, res) => {
    let sql = `SELECT * FROM adresa WHERE id=${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// podaci o stanu
app.get("/o_stanu/:stan_id", (req, res) => {
    let sql = `SELECT * FROM adresa, karakteristike, stan WHERE stan.adresa_id=adresa.id AND stan.karakteristike_id=karakteristike.id AND stan.id=${req.params.stan_id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// stanari
app.get("/stanari/:stan_id", (req, res) => {
    let sql = `SELECT * FROM najam, korisnik, stan WHERE najam.stan_id=${req.params.stan_id} AND najam.korisnik_id=korisnik.id AND stan.id=najam.stan_id`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// moji stanari
app.get("/moji_stanari/:vlasnik_id", (req, res) => {
    let sql = `SELECT korisnik.id AS korisnik_id, ime, prezime, najam.stan_id, cijena, vlasnistvo.vlasnik_id FROM korisnik, najam, stan, vlasnistvo WHERE korisnik.id=najam.korisnik_id AND stan.id=najam.stan_id AND vlasnistvo.stan_id=stan.id AND vlasnistvo.vlasnik_id=${req.params.vlasnik_id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


const PORT = 5000;

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`)
});

server.listen(PORT, () => { console.log(`server radi na portu ${PORT}`); });

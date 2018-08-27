const express = require('express');
const app = express();
const fs = require('fs');
let multer = require('multer');
let upload = multer({dest: 'uploads/'}).single('file');
let bodyParser = require('body-parser');
import config from 'config';

app.use(express.static('public'));
app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({extended: false});
const DOMAIN_NAME = 'http://localhost:8080';

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", DOMAIN_NAME);
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use((req, res, next) => setTimeout(next, config.get('timeout')));

app.get('/films', function (req, res) {
    fs.readFile(config.get('movies_data'), 'utf8', (err, data) => {
        let films = JSON.parse(data);
        const filmsFiltered = films.map((film) => {
            return {
                id: film.id,
                img: film.img,
                titre: film.titre
            }
        });
        res.send(filmsFiltered)
    })
});

app.get('/films/:id', function (req, res) {
    let id = req.params.id;

    if (!isNaN(parseInt(id, 10)) && id > 0) {
        fs.readFile(config.get('movies_data'), 'utf8', (err, data) => {
            let films = JSON.parse(data);
            const film = films.filter(function (film) {
                return film.id == id
            });
            if (film[0]) {
                res.send(film[0].resume)
            }
        })
    } else {
        res.status(404).send('error');
    }

});

app.delete('/films/:id', function (req, res) {
    let id = req.params.id;

    if (!isNaN(parseInt(id, 10)) && id > 0) {
        fs.readFile(config.get('movies_data'), 'utf8', (err, data) => {
            let films = JSON.parse(data);
            films.forEach(function (film, index) {
                if (film.id == id) {
                    films.splice(index, 1);
                }
            });
            let json = JSON.stringify(films);
            fs.writeFile(config.get('movies_data'), json, 'utf8', () => console.log(''));
        });
        res.status(200).send('ok')
    } else {
        res.status(404).send('error');
    }

});


app.post('/film', function (req, res) {
    let errors = [];
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).send({error: err})
        } else {
            let datas = JSON.parse(req.body.datas);
            if (req.file == null) {
                errors.push('file');
            }
            Object.keys(datas).forEach(elt => {
                if (!datas[elt] || datas[elt].trim().length === 0) {
                    errors.push(elt);
                }
            });
            if (errors.length > 0) {
                return res.status(400).send({error: 'missing data', errors});
            }
            fs.readFile(config.get('movies_data'), 'utf8', function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    let obj = JSON.parse(data);
                    obj.push(datas);
                    let json = JSON.stringify(obj);
                    fs.writeFile(config.get('movies_data'), json, 'utf8', () => console.log(''));
                }
            });

            return res.status(200).send('ok');
        }
    })
});

export default app;
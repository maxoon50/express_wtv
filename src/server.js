const express = require('express');
const app = express();
const JSON_FILE = 'src/data/movies.json';
const fs = require('fs');
let multer  = require('multer')
let upload = multer({ dest: 'uploads/' }).single('file')
let bodyParser = require('body-parser')

app.use( express.static('public'));
app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const DOMAIN_NAME = 'http://localhost:8080';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", DOMAIN_NAME );
    res.header('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT');
    res.header( "Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/films', function (req, res) {
  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    let films = JSON.parse(data);
    const filmsFiltered = films['films'].map((film) => {
      return {
        id: film.id,
        img: film.img,
        titre: film.titre
      }
    });

    res.send(filmsFiltered)
  })
});

app.get('/films/:id', function(req, res) {
    let id = req.params.id;

        if(!isNaN( parseInt(id, 10))){
                fs.readFile(JSON_FILE, 'utf8', (err, data) => {
                    let films = JSON.parse(data);
                    const film = films['films'].filter(function (film) {
                        return film.id == id
                    });
                    res.send(film[0].resume)
                })
        }else{
            res.send('error');
        }

});

app.post('/film', function(req, res) {
    upload(req, res, function (err) {
        //datas.titre, datas.resume
        if (err) {
                console.log(err)
                res.status(500).send( { error: err })
        }else{
            console.log(req.file)
            let datas = JSON.parse(req.body.datas);
            res.status(200).send('ok');
        }
    })
})



app.listen(8005, function () {
  console.log('listening on port 8005!')
});

const express = require('express');
const app = express();
const cors = require('cors');
const JSON_FILE = 'src/data/movies.json';
const fs = require('fs');
let multer  = require('multer')
let upload = multer({ dest: 'uploads/' }).single('file')

let bodyParser = require('body-parser')

const corsOptions = {
  origin: ['http://localhost:8080', 'http://192.168.1.10:8080','http://localhost:8082', 'http://192.168.1.10:8082','http://localhost:8081', 'http://192.168.1.10:8081',],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use( express.static('public'));
app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false })


app.get('/films', function (req, res) {
  fs.readFile(JSON_FILE, 'utf8', (err, data) => {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
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
        console.log(req.file)
        let datas = JSON.parse(req.body.datas);
        //datas.titre, datas.resume
        if (err) {
            res.status(500);
            res.render('error', { error: err });
            return res;
        }else{
            res.status(200);
            res.send('ok')
        }
    })
})



app.listen(8005, function () {
  console.log('listening on port 8005!')
});

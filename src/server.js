
const express = require('express');
const app = express();
const cors = require('cors');
const JSON_FILE = 'src/data/movies.json';
const fs = require('fs');

const corsOptions = {
  origin: ['http://localhost:8080', 'http://192.168.1.10:8080','http://localhost:8081', 'http://192.168.1.10:8081'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));



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


app.listen(8005, function () {
  console.log('listening on port 8005!')
});

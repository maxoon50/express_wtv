
const express = require('express');
const app = express();
const cors = require('cors')
const JSON_FILE = 'src/data/movies.json';
const fs = require('fs')

const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200
}
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
    })

    res.send(filmsFiltered)
  })
})

app.get('/films/:id', function(req, res){
  console.log(req.id)
    res.send(req.id)
})

app.listen(8005, function () {
  console.log('listening on port 5000!')
})

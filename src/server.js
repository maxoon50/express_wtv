
const express = require('express');
const app = express();
const JSON_FILE = 'src/data/movies.json';
const fs = require('fs')

app.get('/ping', function (req, res) {
  res.send('pong')
})

app.get('/films', function(req, res){
  fs.readFile(JSON_FILE, 'utf8', (err, data)=>{
    res.json(JSON.parse(data))
  })
})

app.listen(8005, function () {
  console.log('listening on port 5000!')
})

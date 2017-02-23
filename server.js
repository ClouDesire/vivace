var http = require('http');
var express = require('express');
var Vibrant = require('node-vibrant');

var app = express();
var server = http.createServer(app);

app.get('/', function (req, res) {
  var imgUrl = req.query.imgUrl;

  if (imgUrl == undefined) {
    res.status(400).send('Missing `imgUrl` parameter');
    return;
  }

  Vibrant.from(imgUrl).getPalette(function (err, palette) {
    if (err != null) {
      res.status(500).send(err.toString());
    }

    res.json(palette);
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
  var addr = server.address();
  console.log("Vivace listening at", addr.address + ":" + addr.port);
});

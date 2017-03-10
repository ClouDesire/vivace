const cors = require('cors');
const express = require('express');
const http = require('http');
const request = require('request');
const Vibrant = require('node-vibrant');

const app = express();
const server = http.createServer(app);

app.use(cors());

app.get('/', (req, res, next) => {
  const imgUrl = req.query.imgUrl;

  if (!imgUrl) {
    let err = new Error('missing `imgUrl` parameter');
    err.status = 400;
    throw err;
  }

  request({
    url: imgUrl,
    encoding: null
  }, (error, response, body) => {
    if (error != null) {
      res.status(400).send(error);
      return next(error);
    }

    Vibrant.from(body).getPalette((err, palette) => {
      if (err != null) {
        res.status(400).send(err.toString());
        return next(err);
      }

      const maxAge = process.env.MAX_AGE || 1296000;  // 15 days
      res.set('Cache-Control', 'public, max-age=' + maxAge);
      res.json(palette);
    });
  });
});

app.use(function(err, req, res, next) {
  if (err.status !== 400) {
    return next();
  }

  res.status(400).send(err.toString());
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
  const addr = server.address();
  console.log('Vivace listening at', addr.address + ':' + addr.port);
});

module.exports = server;

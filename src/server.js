const http = require('http');
const express = require('express');
const Vibrant = require('node-vibrant');

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
  const imgUrl = req.query.imgUrl;

  if (imgUrl == undefined || imgUrl == '') {
    res.status(400).send('Missing `imgUrl` parameter');
    return;
  }

  Vibrant.from(imgUrl).getPalette((err, palette) => {
    if (err != null) {
      res.status(500).send(err.toString());
    }

    const maxAge = process.env.MAX_AGE || 1296000;  // 15 days
    res.set('Cache-Control', 'public, max-age=' + maxAge);
    res.json(palette);
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
  const addr = server.address();
  console.log('Vivace listening at', addr.address + ':' + addr.port);
});

module.exports = server;

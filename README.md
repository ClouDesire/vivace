# vivace

> Extract prominent colors from an image

It exposes [node-vibrant](https://www.npmjs.com/package/node-vibrant) image analysis results via JSON.

## Install

Install with docker

```sh
$ docker build -t cloudesire/vivace .
$ docker run -p 8080:3000 -d cloudesire/vivace
```

webservice is now listening on port 8080.

## Usage

```sh
curl http://localhost:8080/?imgUrl=https://appshop.cloud/images/marketplace/logo.png
```

```json
{
  "LightMuted": {
    "rgb": [252,252,252],
    "population": 240,
    "hsl": [0,0,0.9882352941176471]
  }
}
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/ClouDesire/vivace/issues)

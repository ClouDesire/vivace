# vivace

> Extract prominent colors from an image

It exposes [node-vibrant](https://www.npmjs.com/package/node-vibrant) image analysis results via JSON API.

## Install

Install with docker

```sh
$ docker build -t cloudesire/vivace .
$ docker run -p 8080:3000 -d cloudesire/vivace
```

webservice is now listening on port 8080.

## Usage

```sh
curl http://localhost:8080/?imgUrl=https://pbs.twimg.com/profile_images/616283184104390656/mFS3zZrF.jpg
```

```json
{
	"Vibrant": {
		"rgb": [240, 151, 20],
		"population": 235,
		"hsl": [0.09924242424242423, 0.88, 0.26]
	},
	"Muted": null,
	"DarkVibrant": {
		"rgb": [124.644, 77.43839999999999, 7.956000000000001],
		"population": 0
	},
	"DarkMuted": null,
	"LightVibrant": {
		"rgb": [107, 194, 227],
		"population": 148,
		"hsl": [0.5458333333333333, 0.6818181818181818, 0.6549019607843137]
	},
	"LightMuted": {
		"rgb": [232, 220, 202],
		"population": 12,
		"hsl": [0.10000000000000009, 0.39473684210526305, 0.8509803921568627]
	}
}
```

A value of `null` means that such particular color can't be extracted from the image.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/ClouDesire/vivace/issues)

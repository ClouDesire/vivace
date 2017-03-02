const request = require('supertest');
require('should');

describe('loading express', () => {
  let server;

  beforeEach(() => server = require('../src/server'));

  afterEach(() => server.close());

  it('responds to /', (done) => {
    request(server)
      .get('/?imgUrl=https://appshop.cloud/images/marketplace/logo.png')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.headers.should.have.property('cache-control').equal('public, max-age=1296000');
        res.headers.should.have.property('access-control-allow-origin').equal('*');
        res.body.should.have.property('LightMuted');
        res.body.LightMuted.should.be.an.array;
        res.body.LightMuted.should.have.property('rgb');
        res.body.LightMuted.rgb.should.containDeep([252, 252, 252]);
        done();
      });
  });

  it('follows redirects', (done) => {
    request(server)
      .get('/?imgUrl=https://backend.cloudesire.com/api/productImageFile/static/883.png')
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('LightMuted');
        res.body.LightMuted.should.have.property('rgb');
        res.body.LightMuted.rgb.should.containDeep([153, 170, 171]);
        done();
      });
  });

  it('responds to preflight cors requests', (done) => {
    request(server)
      .options('/?imgUrl=https://appshop.cloud/images/marketplace/logo.png')
      .set('Origin', 'http://localhost')
      .expect(200)
      .end((err, res) => {
        res.headers.should.have.property('access-control-allow-origin').equal('*');
        done();
      });
  });

  const error = 'Error: missing `imgUrl` parameter';

  it('imgUrl parameter is required', (done) => {
    request(server).get('/').expect(400, error, done);
  });

  it('imgUrl parameter must not be empty', (done) => {
    request(server).get('/?imgUrl=').expect(400, error, done);
  });

  it('404 everything else', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('500 when not 200 or 300', (done) => {
    request(server)
      .get('/?imgUrl=https://httpbin.org/status/418')
      .expect(500, done);
  }).timeout(5000);
});

const request = require('supertest');
const should = require('should');

describe('loading express', () => {
  let server;

  beforeEach(() => server = require('../src/server'));

  afterEach(() => server.close());

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/?imgUrl=https://appshop.cloud/images/marketplace/logo.png')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('LightMuted');
        res.body.LightMuted.should.be.an.array;
        res.body.LightMuted.should.have.property('rgb');
        res.body.LightMuted.rgb.should.containDeep([252, 252, 252]);
        done();
      });
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    server = require('../src/server');
  });

  afterEach(function () {
    server.close();
  });

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/?imgUrl=https://appshop.cloud/images/marketplace/logo.png')
      .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

const app = require('../src/app');

describe('App', () => {

  it('GET / responds with 200 containing "GET request received"', () => {
    return (
      supertest(app)
        .get('/')
        .expect(200, 'GET request received')
    );
  });

});
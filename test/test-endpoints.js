import app from '../src';
import request from 'supertest';

describe('Endpoints', () => {
  it('/ should return status code 200', (done) => {
    request(app)
      .get('/SERVICE_NAME/services/helloworld/hello')
      .expect(200)
      .end(function(err) {
        if (err) {
          done(err);
          return;
        }
        done();
      });
  });
});

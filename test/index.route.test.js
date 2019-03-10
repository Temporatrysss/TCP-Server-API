import request from 'supertest';

import app from '../src/index';

describe('# API server', () => {
  describe('when enter root', () => {
    it('it should return 200', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
  describe('when enter test route', () => {
    it('it should return 200', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
});

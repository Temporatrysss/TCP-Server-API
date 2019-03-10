import { expect } from 'chai';
import request from 'supertest';
import dgram from 'dgram';

import app from '../src/index';

describe('# Radar(波五角圖數值)', () => {
  describe('## Success Test', () => {
    /**
     * Radar 測試
     * */

    // 在沒有Client傳送資料時回應400(Bad Request)
    describe('when enter radar api [GET]', () => {
      it('it should return 400', (done) => {
        request(app)
          .get('/radar')
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    // 當Client使用UDP協定傳送資料時回傳200(OK)
    describe('when enter radar api [GET]', () => {
      it('it should return 200', (done) => {
        // send data via UDP
        const socket = dgram.createSocket('udp4');
        socket.bind(() => {
          socket.setBroadcast(true);
        });
        const data1 = Math.floor(Math.random() * 10); // 1 Attention
        const data2 = Math.floor(Math.random() * 10); // 2 Emotional Level
        const data3 = Math.floor(Math.random() * 10); // 3 Fatigue
        const data4 = Math.floor(Math.random() * 10); // 4 Stress
        const data5 = Math.floor(Math.random() * 10); // 5 Rational Level
        const message = Buffer.from(`${data1}:${data2}:${data3}:${data4}:${data5}`, 'utf8');
        socket.send(message, 0, message.length, 5000, '127.0.0.1', (err) => {
          console.log(err);
          socket.close();
        });
        request(app)
          .get('/radar')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = res.text;
            expect(result).to.be.a('string');
            done(err);
          });
      });
    });
  });
});

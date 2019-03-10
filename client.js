var dgram = require("dgram");

var socket = dgram.createSocket("udp4");
socket.bind(function () {
  socket.setBroadcast(true);
});

setInterval(function () {
  let data1 = randomInt(0, 10); //1 Attention
  let data2 = randomInt(0, 10); //2 Emotional Level
  let data3 = randomInt(0, 10); //3 Fatigue
  let data4 = randomInt(0, 10); //4 Stress
  let data5 = randomInt(0, 10); //5 Rational Level
  var message = Buffer.from(`${data1}:${data2}:${data3}:${data4}:${data5}`, 'utf8');
  socket.send(message, 0, message.length, 5000, '127.0.0.1', function (err, bytes) {
    console.log(err);
    // socket.close();
  });
}, 1000);

const randomInt = (a, b) => { // 取得 a 到 b 之間的一個整數亂數
  return Math.floor(a + Math.random() * (b - a));
}

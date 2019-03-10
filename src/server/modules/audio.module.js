import dgram from 'dgram';
import httpStatus from 'http-status';
import APPError from '../helper/AppError';
import config from '../../config/config';

/** 開啟 UDP 監聽 5001 PORT
 * 並接收 matlab 傳過來的腦波訊號 */
const net = require('net');

let textChunk = '';
let base64Data = '';
const server = net.createServer((socket) => {
  socket.setEncoding('utf-8');
  socket.write('Echo server\r\n');
  socket.on('data', (data) => {
    textChunk += data;
    console.log('data');
  });
  socket.on('end', () => {
    const arr = textChunk.split('</EndofFile>');
    console.log(JSON.parse(arr[0]).base64);
    base64Data = JSON.parse(arr[0]).base64;
    textChunk = '';
  });
});
server.listen(3010, '58.114.172.33');

/* Audio GET 取得腦波五個訊號 */
const getAudio = () => {
  return new Promise((resolve, reject) => {
    if (base64Data != null) {
      const result = base64Data;
      console.log("00" + result);
      base64Data = '';
      resolve(result);
    } else {
      reject(new APPError.APIError(httpStatus.BAD_REQUEST, 'Can not connecting with Matlab. Please make sure the Matlab or Brainware is working !', 'API_BAD_REQUEST', 400));
    }
  });
};

export default {
  getAudio
};

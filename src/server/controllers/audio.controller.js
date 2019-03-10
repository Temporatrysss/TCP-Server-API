import audioModule from '../modules/audio.module';

/*  Audio GET UDP接收腦波五個數值  */
const audioGet = (req, res, next) => {
  audioModule.getAudio().then((result) => {
    res.send(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/** debugger router */
const test = (req, res) => {
  res.send('測試');
};


export default {
  audioGet,
  test
};

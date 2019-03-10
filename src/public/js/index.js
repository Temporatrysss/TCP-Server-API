const graphData = []; // Radar Chart data set
let chartRadar; // char DOM
const count = 0;
const attention = 0;
const rational = 0;
const emotional = 0;
const fatigue = 0;
const stress = 0;


document.getElementById('test').innerHTML = window.location.host;

console.log(window.location.host);
setInterval(() => {
  $(document).ready(() => {
    $.ajax({
      method: 'GET',
      url: `http://${window.location.host}/audio`
    })
      .done((msg) => {
        console.log(msg);
        if (msg !== '') {
          console.log('append');
          const audio = document.createElement('audio');
          //audio.autoplay = 'autoplay';
          // audio.src = `data:audio/ogg;base64,${msg}`;
          // audio.autoplay = true;
          // audio.controls = true;
          document.body.innerHTML = `<iframe
      src="data:audio/mpeg;base64,${msg}">
      The “iframe” tag is not supported by your browser.
    </iframe>`;
        }
      })
      .fail((error) => {
        // console.log(error);
      });
  });
}, 1000);

// let zhText = '請天氣';
// document.write("<audio autoplay=\"autoplay\">");
// document.write("<source src=\"http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=" + zhText + "\" type=\"audio/mpeg\">");
// document.write("</audio>");

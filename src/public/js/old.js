var graphData = []; // Radar Chart data set
var chartRadar; // char DOM
var count = 0;

document.getElementById("test").innerHTML = window.location.host;

drawRadar();
console.log(window.location.host);
setInterval(function () {
  $(document).ready(function () {
    $.ajax({
      method: "GET",
      url: "http://" + window.location.host + "/radar",
    })
      .done(function (msg) {
        count++;
        console.log(`${count}`);
        if (count % 5 == 0)
          console.log(msg);
        document.getElementById("data").innerHTML = msg;
        BRIlineChartRender(msg);
      })
      .fail(function (error) {
        // console.log(error); 
      });
  });
}, 1000);



function drawRadar() {
  //定義變數
  var chartRadarDOM;
  var chartRadarData;
  var chartRadarOptions;

  //載入雷達圖
  Chart.defaults.global.legend.display = false;
  Chart.defaults.global.defaultFontColor = "rgba(0,0,74, 1)";
  chartRadarDOM = document.getElementById("chartRadar");
  chartRadarData;
  chartRadarOptions =
    {
      scale:
      {
        ticks:
        {
          fontSize: 12,
          beginAtZero: true,
          maxTicksLimit: 7,
          min: 0,
          max: 10
        },
        pointLabels:
        {
          fontSize: 13,
          color: "#0044BB"
        },
        gridLines:
        {
          color: "#009FCC"
        }
      }
    };

  // Rader Data initial
  // graphData.push(0);
  // graphData.push(0);
  // graphData.push(0);
  // graphData.push(0);
  // graphData.push(0);
  graphData[0] = 0;
  graphData[1] = 0;
  graphData[2] = 0;
  graphData[3] = 0;
  graphData[4] = 0;



  // CreateData Rader Create
  chartRadarData = {
    labels: ["Attention", "Emotional Level", "Fatigue", "Stress", "Rational Level"],
    datasets: [{
      label: "Level",
      backgroundColor: "rgba(255, 0, 0,0.4)",
      borderColor: "rgba(255,0,0,.6)",
      pointBackgroundColor: "rgba(63,63,74,1)",
      pointBorderColor: "rgba(0,0,0,0)",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(0,0,0,0.3)",
      pointBorderWidth: 5,
      data: graphData
    }]
  };
  //Draw DOM
  chartRadar = new Chart(chartRadarDOM, {
    type: "radar",
    data: chartRadarData,
    options: chartRadarOptions
  });
}


// BRI rendar line chart data
function BRIlineChartRender(data) {
  var radarData = data.split(":");
  // graphData.push({ x: 0, y: radarData[0] }); //1 Attention
  // graphData.push({ x: 0, y: radarData[2] }); //2 Emotional Level
  // graphData.push({ x: 0, y: radarData[3] }); //3 Fatigue
  // graphData.push({ x: 0, y: radarData[4] }); //4 Stress
  // graphData.push({ x: 0, y: radarData[1] }); //5 Rational Level
  // BRIlineChart.render();
  graphData[0] = radarData[0]; //1
  graphData[4] = radarData[1]; //2
  graphData[1] = radarData[2]; //3
  graphData[2] = radarData[3]; //4
  graphData[3] = radarData[4]; //5
  chartRadar.update();
}

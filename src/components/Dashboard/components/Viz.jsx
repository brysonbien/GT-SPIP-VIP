import React, { useState, useEffect } from "react"
import 'chart.js/auto'
import { Scatter} from "react-chartjs-2"
import { Chart as ChartJS , registerables} from "chart.js";

ChartJS.register(...registerables);

function Viz({ player, playerData, averageData }) {
  const [haveData, setHaveData] = useState(false)
  const [data, setData] = useState({})


  useEffect(() => {
    if(playerData == null){
      setHaveData(false)
    } else {
    setData({datasets: [{
      type: 'scatter',
      label: 'Average',
      data: averageData,
      backgroundColor: 'rgba(255, 99, 132)'
    },{
      type: 'scatter',
      label: 'Weekly',
      data: playerData,
      backgroundColor: 'rgba(0, 99, 132)',
      showLine: true
    }]
  })
    setHaveData(true)}
  }, [playerData])


  useEffect(() => {
    ChartJS.register({
      id: "custom_canvas_background_color",
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext("2d");
        const {chartArea: {top, bottom, left, right, width}} = chart
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = "rgb(255, 127, 127)"
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(left, bottom);
        ctx.lineTo(right, bottom);
        ctx.closePath()
        ctx.fill()
        ctx.fillStyle = "lightGreen"
        ctx.beginPath();
        ctx.moveTo(left, top);
        ctx.lineTo(right, top);
        ctx.lineTo(right, bottom);
        ctx.closePath()
        ctx.fill()
        ctx.restore();
        // console.log(averageData[0].x)
        //chart.update();
      }
    })
  }, [averageData])
  

  var options = {
    plugins:{
      tooltip:{
        displayColors: false,
        callbacks: {
          title: function(tooltipItem) {
                return data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].dataIndex].day;
                
          },
          label: function(tooltipItem){
            return ["Mechanical Load: " + tooltipItem.raw.x, "Physio Load: " + tooltipItem.raw.y]
          }
        }
      }
    },
    //plugins:[custom_canvas_background_color],
    elements: {
      point:{
        pointStyle:function(context) {
          if(context.raw.day === 'average') {
            return 'triangle'
          } else {
            return 'circle'
          }
        },
        radius: function(context) {
          if(context.raw.day === 'average') {
            return 20
          } else {
            return 15
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mechanical Load'
        },
        max: 3000,
        min:0
      },
      y: {
        title: {
          display: true,
          text: 'Physio Load'
        },
        max: 1800,
        min:0
      }
    }
  };

  if (!haveData){
    return <div>Loading...</div>
  } else {
  return (
    <div className="Viz">
      <div className="viz_title">{player}</div>
      <Scatter data={data} options={options} style={{ height: '500px' }}/>
    </div>
  )
  }
}

export default Viz
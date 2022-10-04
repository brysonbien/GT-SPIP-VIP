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
        }
      },
      y: {
        title: {
          display: true,
          text: 'Physio Load'
        }
      }
    }
  };

  if (!haveData){
    return <div>Loading...</div>
  } else {
  return (
    <div className="Viz">
      <div className="viz_title">{player}</div>
      <Scatter data={data} options={options}/>
    </div>
  )
  }
}

export default Viz
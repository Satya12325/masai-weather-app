import React from 'react'
import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function Chart({temp}) {
    const [data, setData]= useState({
        labels:["6 AM","9 AM","12 PM","1 PM","3 PM","6 PM"],
        datasets:[
          {
            label:"First Dataset",
            data:temp,
            backgroundColor:'yellow',
            borderColor:'orange',
            tension:0.4,
            fill:true,
            pointStyle:'rect',
            pointBorderColor:'green',
            pointBackgroundColor:'#fff',
            showLine:true
          }
        ]
      })
      return (
        <div className="App" style={{width:'500px', height:'800px',margin:"auto"}}>
          <Line data={data}>Hello</Line>
        </div>
      );
}

export default Chart

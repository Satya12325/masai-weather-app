import React from 'react'
import {useState} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
  Title, Tooltip, LineElement, Legend,
  CategoryScale, LinearScale, PointElement, Filler
)

function Chart({temp}) {
  var currentday = new Date();
  var currentdayHour = currentday.getHours();
  var totalHours =[];

  for(var i= currentdayHour; i<=currentdayHour+12;i++){
    totalHours.push(i)
  }
  var dailyHoursData= [];

  for(var j=currentdayHour;j<currentdayHour+12;j++){
    dailyHoursData.push(Math.round(temp[j].temp))
  }
    const [data, setData]= useState({
        labels:totalHours,
        datasets:[
          {
            label:"First Dataset",
            data:dailyHoursData,
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
        <div className="App" style={{width:'500px',margin:"auto"}}>
          <Line data={data}>Hello</Line>
        </div>
      );
}

export default Chart

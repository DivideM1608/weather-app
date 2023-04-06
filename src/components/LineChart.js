import React from 'react'
import { Line } from 'react-chartjs-2';

function LineChart({time, temperature}) {
  const data = {
    labels: [...time],
    datasets: [
      {
        label: 'temperature',
        data: [...temperature],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  return (
    <div>
      <div className='header'>
      <h1 className='title'>Line Chart</h1>
      </div>
      <Line data={data} />
    </div>
  )
}

export default LineChart
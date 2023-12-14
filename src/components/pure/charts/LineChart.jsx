import React from 'react';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';

const LineChart =  ({options,data}) =>{
return <Line options={options} data={data}/>
}
export default LineChart

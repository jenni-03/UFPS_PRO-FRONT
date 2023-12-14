import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarStack =  ({options,data}) =>{
return <Bar options={options} data={data}/>
}
export default BarStack

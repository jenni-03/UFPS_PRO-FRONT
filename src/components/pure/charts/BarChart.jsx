import React, {useEffect, useState} from "react";
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { Box, Flex, Text, Spinner} from "@chakra-ui/react";

const BarChart = ({datos,labels,titulo,valorTotal}) => {


  return (
    <>
      <Box w={"90%"} h={"70vh"} backgroundColor={"#fff"}
        boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
        p={"15px"} borderRadius={"8px"}>
        <Bar
          data={{
            labels: labels,
            datasets: [
              {
                label: titulo,
                data: datos,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.1)',
                  'rgba(54, 162, 235, 0.1)',
                  'rgba(255, 206, 86, 0.1)',
                  'rgba(192, 65, 192, 0.1)',
                  'rgba(200, 230, 65, 0.1)',
                  'rgba(255, 192, 192, 0.1)',
                  'rgba(150, 5, 152, 0.1)',
                ],
                borderColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(192, 65, 192, 0.6)',
                  'rgba(200, 230, 65, 0.6)',
                  'rgba(255, 192, 192, 0.6)',
                  'rgba(150, 5, 152, 0.6)',
                ],
                borderWidth: 3,
              }
            ]
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              y:{
                max:valorTotal,
                ticks:{
                  font:{
                    size:18
                  }
                }
              },
              x:{
                ticks:{
                  font:{
                    size:13
                  }
                }
              }

            },
            plugins:{
              legend: {
                display: true,
                labels: {
                  font: {
                    size:22
                  }
                }


              }
            }

          }
          }
        />
      </Box>
    </>
  );
};

export default BarChart;


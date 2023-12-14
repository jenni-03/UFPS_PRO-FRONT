import React from "react"
import { Box, Text } from "@chakra-ui/react"
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2"


const DoughnutChart = ({datos,labels}) =>{
return(
  <>
<Text width={"100%"} textAlign={"center"} fontWeight={"bold"} fontSize={"20px"} color={"gray.500"}>% De cada categoría</Text>
      <Box w={"90%"} h={"50vh"} backgroundColor={"white"}
boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
        p={"15px"} borderRadius={"8px"}>
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                data: datos,
                backgroundColor: [
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
                      }
          }
        />
      </Box>
    </>
)
}

export default DoughnutChart

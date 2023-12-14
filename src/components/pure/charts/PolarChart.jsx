import React, {useEffect, useState} from "react";
import { PolarArea } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { Box, Flex, Text, Spinner} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext} from "../../context/AppProvider";
import axiosApi from "../../../utils/config/axios.config"
import toast from "react-hot-toast";

const PolarChart = ({id}) =>{

  const {token} = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState(0)
  const [mediana,setMediana]=useState(0)
  const [moda,setModa]=useState(0)

  const verResultados = async (id) =>{
    const response = await axiosApi.get(`/api/resultados/convocatoria/${id}`,{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    if(response.status===200){
      setMedia(parseInt(response.data.promedio))
      setModa(parseInt(response.data.moda))
      setMediana(parseInt(response.data.mediana))
      setLoading(false)
    }
  }

  useEffect(()=>{
    verResultados(id)
  },[])
  
 if(loading){
    return <Spinner color={"black"} size={"xl"} m={"20% auto"}  ></Spinner>
 }else{
 }



  return (

    <Box w={"90%"} display={"flex"} 
      justifyContent="center"
      alignItems={"center"}
      borderRadius={"8px"}
boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
      h={"70vh"} backgroundColor={"#fff"}>
      <PolarArea
        data={{
        labels: ["Media","Mediana","Moda"],
  datasets: [
    {
      data: [media,mediana,moda],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
        }}
        options={{
            maintainAspectRatio: false,
             scales: {
            r: {
              ticks: {
                font: {
                  size: 17, // Ajusta el tamaño de la fuente en el eje y
                },
              },
            },
          },
            plugins:{
              legend: {
                display: true,
                labels: {
                  font: {
                    size:17
                  }
                }


              }
            }
        }}
      /> 
    </Box>
  )
}

export default PolarChart

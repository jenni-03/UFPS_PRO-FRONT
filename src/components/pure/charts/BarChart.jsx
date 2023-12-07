import React, {useEffect, useState} from "react";
import { Bar , Doughnut} from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { Box, Flex, Text, Spinner} from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext} from "../../context/AppProvider";
import axiosApi from "../../../utils/config/axios.config"
import toast from "react-hot-toast";

const BarChart = ({id}) => {



  const {open,token} = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [datos, setData] = useState(true)
  const [categorias,setCategorias]=useState([])
  const [valores,setValores]=useState([])
  const [puntajes, setPuntajes]=useState([])
  const [valorTotal,setValorTotal]=useState(0)

  const obtenerData = async() =>{
    const response = await axiosApi.get(`/api/resultados/estudiante/${id}`,{
      headers:{
        Authorization:"Bearer " + token
        
    }})
      .catch((e)=>{
        toast.error(e.response.data.error)
      })
    console.log(response.data)
    if(response.status=200){
      setData(response.data)
      setCategorias(response.data.resultados.map(c => c.nombre_categoria))
      setValores(response.data.resultados.map(c => c.valor_categoria))
      setPuntajes(response.data.resultados.map(c => c.puntaje))
      setValorTotal(response.data.puntaje_total_prueba)
      
      setLoading(false)
    }
  }

  if(categorias&&valores){
    console.log(categorias)
    console.log(valores)
  }

  useEffect(()=>{
    obtenerData()
  },[])


  if(loading){
    return <Spinner color={"black"} size={"xl"} m={"20% auto"}  ></Spinner>
  }

  return (
    <Flex  w={!open?"calc(100% - 10px)":"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={"20px"} >
      <Box w={"90%"} h={"70vh"} backgroundColor={"#fff"}
boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
        p={"15px"} borderRadius={"8px"}>
        <Bar
          data={{
            labels: categorias,
            datasets: [
              {
                label: datos.nombre_prueba,
                data: puntajes,
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
      <Text width={"100%"} textAlign={"center"} fontWeight={"bold"} fontSize={"20px"} color={"gray.500"}>% De cada categoría</Text>
      <Box w={"90%"} h={"50vh"} backgroundColor={"white"}
boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
        p={"15px"} borderRadius={"8px"}>
        <Doughnut
          data={{
            labels: categorias,
            datasets: [
              {
                data: valores,
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
    </Flex>
  );
};

export default BarChart;


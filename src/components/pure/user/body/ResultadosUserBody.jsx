import React,{useContext, useState, useEffect} from "react";
import { AppContext } from "../../../context/AppProvider";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Box, Flex, Text, Spinner} from "@chakra-ui/react";
import axiosApi from "../../../../utils/config/axios.config"
import DoughnutChart from "../../charts/DoughnutChart";
import BarChart from "../../charts/BarChart";
import toast from "react-hot-toast";
const ResultadosUserBody = ({id}) =>{
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
        if(response.status=200){
            setData(response.data)
            setCategorias(response.data.resultados.map(c => c.nombre_categoria))
            setValores(response.data.resultados.map(c => c.valor_categoria))
            setValorTotal(response.data.puntaje_total_prueba)
            setPuntajes(response.data.resultados.map(c => c.puntaje))
            setLoading(false)
        }
    }

      useEffect(()=>{
     obtenerData()
    },[])

     if(loading){
        return <Spinner color={"black"} size={"xl"} m={"20% auto"}  ></Spinner>
        }



    return (
            
    <Flex  w={!open?"calc(100% - 10px)":"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={"20px"} >
      <BarChart datos={puntajes} labels={categorias}  titulo={datos.nombre_prueba} valorTotal={valorTotal} /> 
      <DoughnutChart datos={valores} labels={categorias}/>
    </Flex>
    )
}
export default ResultadosUserBody

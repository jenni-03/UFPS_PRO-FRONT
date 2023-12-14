import React, {useContext, useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosApi from "../../../../../utils/config/axios.config"
import { AppContext } from "../../../../context/AppProvider";
import LineChart from "../../../charts/LineChart";
import BarStack from "../../../charts/BarStack";
import moment from "moment/moment";
import { Box,Button,Flex, Input ,Text, Tooltip} from "@chakra-ui/react";

const ResultadosGlobalesBody = () =>{
  const {id} = useParams()
  const {token, open} = useContext(AppContext)
  const [datos,setData] = useState([])
  const [datosCategorias,setDataCategoria] = useState([])
  const [puntajes,setPuntajes] = useState([])
  const [labels,setLabels] = useState([])
  const [isLoading,setLoading] = useState(true)
  const [isLoading2,setLoading2] = useState(true)
  const [dataBarStack, setDataBarStack] = useState([])
  const finalDefault = moment().utcOffset(-5*60).format('YYYY-MM-DD');
  const inicioDefault = moment().utcOffset(-5*60).subtract(1,"days").format('YYYY-MM-DD')
  const fechaInicio = useRef(inicioDefault)
  const fechaFin = useRef(finalDefault)

  const obtenerResultados = async (id,fechaInicio, fechaFin) =>{

    const body={
      fecha_inicio:fechaInicio,
      fecha_fin:fechaFin,
    }

    const response = await axiosApi.post(`/api/resultados/estudiante/${id}/global`,body,{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch(e =>{
      toast.error(e.response.data.error)
    })

    if(response.status===200){
      setData(response.data)
      const puntajes = response.data.map(c => c.puntaje)
      const labels = response.data.map(c => c.prueba)
      setPuntajes(puntajes)
      setLabels(labels)
      setLoading(false)
    }
  }




  const obtenerCategoriasByEstado = async (estado) => {
    let response = await axiosApi.get(`/api/categoria/?estado=${estado}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).catch(() => {
      toast.error("No se pueden obtener las categorías!")
    })
    const arreglo = response.data.map(c => c.nombre)
  }

  const colorAleatorio = () =>{
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r},${g},${b})`
  }

  const parsearCategorias = (datos) =>{
    const resultado = [];
    const etiquetasUnicas = [...new Set(datos.flatMap(obj => Object.keys(obj)))];

    datos.forEach((elemento) => {
      etiquetasUnicas.forEach(etiqueta => {
        const valor = elemento[etiqueta] || "0";
        const index = resultado.findIndex(item => item.label === etiqueta);

        if (index === -1) {
          resultado.push({
            label: etiqueta,
            data: [Number(valor)],
            backgroundColor: `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
          });
        } else {
          resultado[index].data.push(Number(valor));
        }
      });
    }); 
    return resultado
  }

  const resultadosCategorias = async (id,fechaInicio,fechaFin) =>{
    const body={
      fecha_inicio:fechaInicio,
      fecha_fin:fechaFin,
    }
    const response = await axiosApi.post(`/api/resultados/estudiante/${id}/global/categorias`,body,{
      headers:{
        Authorization: "Bearer " + token,
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    const color = colorAleatorio()
    const data = parsearCategorias(response.data)
    setDataBarStack(data)
    setDataCategoria(response.data)
    setLoading2(false)

  }


  useEffect(()=>{
    obtenerResultados(id, fechaInicio.current, fechaFin.current)
    resultadosCategorias(id, fechaInicio.current, fechaFin.current)
    //obtenerCategoriasByEstado(1)
  },[])

  if(isLoading||isLoading2){
    return <div>cargando...</div>
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Puntaje Total por Convocatoria',
      },
    },

    scales: {
      y:{
        max:500,
        ticks:{
          font:{
            size:18
          }
        }
      },

    }};


  const data = {
    labels,
    datasets: [
      {
        label: 'Puntajes',
        data: puntajes,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  const optionsBar = {
    plugins: {
      title: {
        display: true,
        text: 'Puntaje por categorias en Convocatoria',
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        max:500,
        ticks:{
          font:{
            size:13
          }
        }
      },
    },
  };

  const labelsBar = ['January', 'February', 'March'];

  const dataBar = {
    labels:labels,
    datasets: dataBarStack&&dataBarStack
  };



  return (

    <>
      <Flex  w={!open?"calc(100% - 10px)":"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={"20px"} >
        <Flex w={"70%"} alignItems={"center"} flexDir={["column","column","column","row"]} gap={"20px"}>
          <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"bottom"} hasArrow label={"Fecha Inicial"}>
            <Input
              ref={fechaInicio}
              placeholder="Select Date and Time"
              type="date"
              backgroundColor={"white"}
              defaultValue={inicioDefault}
            />
          </Tooltip>
          <Text>Hasta</Text>
          <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"bottom"} hasArrow label={"Fecha Final"}>
            <Input
              ref={fechaFin}
              placeholder="Select Date and Time"
              type="date"
              backgroundColor={"white"}
              defaultValue={finalDefault}
            />
          </Tooltip>
          <Button w={"100%"} onClick={()=>{
            obtenerResultados(id, fechaInicio.current.value, fechaFin.current.value)
            resultadosCategorias(id, fechaInicio.current.value, fechaFin.current.value)
          }}>Filtrar</Button>
        </Flex>
        {datos.length===0?<Text>Este estudiante no cuenta con pruebas presentadas en este momento</Text>:
        <Box display={"flex"} justifyContent={"center"} w={"90%"} h={"75vh"} backgroundColor={"#fff"}
          boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
          p={"15px"} borderRadius={"8px"}>
          <LineChart options={options} data={data}/>
        </Box>}
        {datosCategorias.length===0?<Text>Este estudiante no cuenta con pruebas presentadas en este momento</Text>:
          <Box display={"flex"} justifyContent={"center"} w={"90%"} h={"60vh"} backgroundColor={"#fff"}
            boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
            p={"15px"} borderRadius={"8px"}>
            <BarStack options={optionsBar} data={dataBar}/>
          </Box>}
      </Flex>


    </>
  )
}

export default ResultadosGlobalesBody

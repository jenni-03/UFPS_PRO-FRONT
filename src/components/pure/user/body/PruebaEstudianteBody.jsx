
import React,{useContext, useEffect} from 'react'
import toast from 'react-hot-toast'
import axiosApi from "../../../../utils/config/axios.config"
import TablaComponent from '../../TablaComponent'
import { AppContext } from '../../../context/AppProvider'
import { AiOutlineEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Tooltip,Text,Button,Badge, Icon} from '@chakra-ui/react'

export default function PruebaEstudianteBody() {

    const {token} = useContext(AppContext)

    const obtenerPruebasEstudiante = async () =>{
        const response = await axiosApi.get("/api/prueba/estudiantes",{
            headers:{
                Authorization: "Bearer " + token
            }
        }).catch(e=>{
            toast.success(e)
        })
        console.log(response.data)
        if(response.status===200){
            return response.data
        }

    }

    useEffect(()=>{
        obtenerPruebasEstudiante()
    },[])


    const columnas =[
        "Nombre",
        "Competencias",
        "Categorias",
        "Puntaje",
        "Resultados"
    ]

    const sortFns = {
        NOMBRE: (array) => array.sort((a, b) => a.nombre_prueba.localeCompare(b.nombre_prueba)),
        PUNTAJE: (array) => array.sort((a, b) => a.puntaje_total_estudiante-b.puntaje_total_estudiante),
    }


    const calcularAprobacion = (puntajeTotal, puntajeObtenido) =>{
        const pasa = puntajeTotal * 0.6
        return puntajeObtenido>=pasa
    }

    const columns = [
        { label: 'Nombre',
            renderCell: (item) => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.nombre_prueba}><Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.nombre_prueba}</Text></Tooltip>,
            sort: { sortKey: 'NOMBRE' },
        },{
            label: "Competencias",
            renderCell: (item) => item.competencias ? item.competencias.map(c => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={c}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{c}</Text></Tooltip>) : null 
        },
        {
            label: "Categorías",
            renderCell: (item) => item.categorias? item.categorias.map(c => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={c}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{c}</Text></Tooltip>) : null 
        },
        {
            label: "Puntaje",
            renderCell: (item)=>{
                const isAprobado = calcularAprobacion(item.puntaje_total_prueba,item.puntaje_total_estudiante)
                return <Badge colorScheme={isAprobado?"green":"red"}>{item.puntaje_total_estudiante}/{item.puntaje_total_prueba}</Badge>
            } ,
            sort : { sortKey:"PUNTAJE" }
        },
        {
        label: "Resultados",
        renderCell: (item) => <Button
          as={Link} to={`/resultadosUser/${item.convocatoria_id}`}
        >
          <Icon as={AiOutlineEye}></Icon>
        </Button>
      },
    ];

    return (
        <TablaComponent 
            inputPlaceHolder={"Busca por prueba"}
            funcionSwitch={obtenerPruebasEstudiante}
            showButton={false}
            showSwitch={false}
            sortFns={sortFns}
            cols={columns}
            aBuscar={"nombre_prueba"}
            base={"265px"}
            sm={"330px"}
            md={"500px"}
            lg={"750px"}
            xl={"1000px"}
            ancho={"1050px"}
            ancho_tres={"1050px"}
            ancho_cuatro={"1050px"}
            ancho_cinco={"1050px"}
            colsR={5}
            wCampo={"200px"}
        >
        </TablaComponent>
    )
}


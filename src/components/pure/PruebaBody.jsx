import React,{useContext} from "react";
import { AiOutlineEdit, AiOutlineFileSearch} from "react-icons/ai";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config"
import TablaComponent from "./TablaComponent";
import { Box, Button, Icon, Tooltip, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function PruebaBody() {
  const {token} = useContext(AppContext)
  //const columns = ["Id","Nombre", "Semestre", "Competencias","Editar"];

  const obtenerPruebasByEstado = async (estado) =>{
    let response = await axiosApi.get(`/api/prueba/?estado=${estado}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    return response.data
  }

   const sortFns = {
    ID: (array) => array.sort((a,b) => a.id-b.id),
    NOMBRE: (array) => array.sort((a,b) => a.nombre.localeCompare(b.nombre)),
    SEMESTRE: (array) => array.sort((a,b)=> a.semestre-b.semestre),
    PREGUNTAS: (array) => array.sort((a,b)=> a.total_preguntas-b.total_preguntas),
  }


   const columns= [
    {
      label:"Id",
      renderCell: (item) => item.id,
      sort: { sortKey: "ID" }

    },
    {
      label:"Nombre",
      renderCell: (item) => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.nombre}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.nombre}</Text></Tooltip>,
      sort: { sortKey: "NOMBRE" }
    },
    {
      label:"Semestre",
      renderCell: (item) => item.semestre,
      sort: { sortKey: "SEMESTRE" }
    },
    {
      label:"Preguntas",
      renderCell: (item) => item.total_preguntas,
      sort: { sortKey: "PREGUNTAS" }
    },
    {
      label: "Competencias",
      renderCell: (item) => item.Competencias ? item.Competencias.map(c => <Box>{c.nombre}</Box>) : null 
    },
    {
      label: "Editar",
      renderCell: (item) => <Button
    as={Link} to={`/editarPrueba/${item.id}`}
  >
    <Icon as={AiOutlineEdit}></Icon>
  </Button>
    },
    {
      label: "Previsualizción",
      renderCell: (item) => <Button
    as={Link} to={`/previsualizacionPrueba/${item.id}`}
  >
    <Icon as={AiOutlineFileSearch}></Icon>
  </Button>
    }
  ]


  return (
  <TablaComponent
      inputPlaceHolder={"Busca por prueba"}
      buttonPath={"/crearPrueba"}
      buttonMsg={"Crear Prueba"}
      funcionSwitch={obtenerPruebasByEstado}
      sortFns={sortFns}
      cols={columns}
      aBuscar={"nombre"}
      base={"265px"}
      sm={"330px"}
      md={"500px"}
      lg={"750px"}
      xl={"1000px"}
      ancho={"1240px"}
      ancho_tres={"1240px"}
      ancho_cuatro={"1240px"}
      ancho_cinco={"1240px"}
      colsR={7}
      wCampo={"200px"}

    />
  );
}

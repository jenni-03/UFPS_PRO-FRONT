import React,{useContext} from "react";
import axiosApi from "../../utils/config/axios.config"
import { AppContext } from "../context/AppProvider";
import TablaComponent from "./TablaComponent";
import { Button, Icon, Text, Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
export default function PreguntaBody() {
  const {token} = useContext(AppContext)
  const columns2= [
    "Id",
    "Enunciado",
    "Semestre",
    "Estado",
    "Categoria",
    "Editar",
  ];

 const obtenerPreguntasByEstado = async (estado) => {
    let response = await axiosApi.get(`/api/question/?estado=${estado}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).catch(() => {
      toast.error("No se pueden obtener las preguntas!")
    })
    return response.data
  }


  const columns = [
    {
      label:"Id",
      renderCell: (item)=>item.id,
      sort: { sortKey: "ID" }
    },
    {
      label: "Enunciado",
      renderCell: (item)=><Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.texto_pregunta}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.texto_pregunta}</Text></Tooltip>, 
      sort: { sortKey: "ENUNCIADO" }
    },
    {
      label: "Semestre",
      renderCell: (item)=>item.semestre,
      sort: { sortKey: "SEMESTRE" }
    },
    {
      label: "Estado",
      renderCell: (item)=>item.estado===true?"Activo":"Inactivo",
    },
    {
      label: "Categoría",
      renderCell: (item)=><Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.Categoria.nombre}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.Categoria.nombre}</Text></Tooltip>,
      sort: { sortKey: "CATEGORIA" }
    },
    {
      label: "Editar",
      renderCell: (item)=><Button
    as={Link} to={`/editarPregunta/${item.id}`}
  >
    <Icon as={AiOutlineEdit}></Icon>
  </Button>,

    }
  ]

  const sortFns ={
    ID: (array)=>array.sort((a,b)=>a.id-b.id),
    ENUNCIADO: (array)=>array.sort((a,b)=>a.texto_pregunta.localeCompare(b.texto_pregunta)), 
    SEMESTRE: (array)=>array.sort((a,b)=>a.semestre-b.semestre),
    CATEGORIA: (array)=>array.sort((a,b)=>a.Categoria.nombre.localeCompare(b.Categoria.nombre))
  }
  
  return (
      <TablaComponent
        inputPlaceHolder={"Busca por pregunta"}
        buttonPath={"/tipoPregunta"}
        buttonMsg={"Agregar Pregunta"}
        funcionSwitch={obtenerPreguntasByEstado}
        sortFns={sortFns}
        cols={columns}
        aBuscar={"texto_pregunta"}
        ancho={"940px"}
        colsR={6}
        wCampo={"200px"}
      />

  );
}

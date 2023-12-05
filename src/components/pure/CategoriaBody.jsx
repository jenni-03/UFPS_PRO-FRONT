import { React, useContext, useEffect, useState } from "react";
import TablaComponent from "./TablaComponent";
import axiosApi from "../../utils/config/axios.config"
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppProvider";
import {AiOutlineEdit} from "react-icons/ai"
import {Link} from "react-router-dom"
import {Button, Icon, Tooltip, Text} from "@chakra-ui/react";

export default function CategoriaBody() {

  const {token} = useContext(AppContext)
  const obtenerCategoriasByEstado = async (estado) => {
    let response = await axiosApi.get(`/api/categoria/?estado=${estado}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).catch(() => {
      toast.error("No se pueden obtener las categorías!")
    })
    return response.data
  }

  const sortFns = {
    ID: (array) => array.sort((a, b) => a.id-b.id),
    NOMBRE: (array) => array.sort((a, b) => a.nombre.localeCompare(b.nombre)),
    COMPETENCIA: (array) => array.sort((a, b) => a.Competencia.nombre.localeCompare(b.Competencia.nombre)),
    PREGUNTAS: (array) => array.sort((a, b) => a.total_preguntas-b.total_preguntas),
  }




  const columns = [
    { label: 'Id',
      renderCell: (item) => item.id,
      sort: { sortKey: 'ID' },
    },
    { label: 'Nombre',
      renderCell: (item) => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.nombre}><Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.nombre}</Text></Tooltip>,
      sort: { sortKey: 'NOMBRE' },
    },
    {
      label: 'Estado',
      renderCell: (item) => item.estado===true? "Activo":"Inactivo",
    },
    { label: 'Competencia',
      renderCell: (item) =>  <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.Competencia.nombre}><Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.Competencia.nombre}</Text></Tooltip>,
      sort: { sortKey: 'COMPETENCIA' },
    },
    {
      label: "Preguntas",
      renderCell: (item)=> item.total_preguntas,
      sort: { sortKey: 'PREGUNTAS' },
    },
    { label: 'Editar', renderCell: (item) =><Button
      as={Link} to={`/editarCategoria/${item.id}`}
    >
      <Icon as={AiOutlineEdit}></Icon>
    </Button>,
    }

  ];




  return (

    <TablaComponent 
      inputPlaceHolder={"Busca por categoría"} 
      buttonPath={"/formularioCategoria"} 
      buttonMsg={"Agregar Categoría"}
      funcionSwitch={obtenerCategoriasByEstado}
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
      colsR={6}
      wCampo={"200px"}
    >
    </TablaComponent>
  );
}

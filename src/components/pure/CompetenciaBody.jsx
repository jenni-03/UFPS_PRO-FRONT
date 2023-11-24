import {React, useContext, useEffect, useState} from "react";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast, Toaster } from "react-hot-toast";
import TablaComponent from "./TablaComponent";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { Button, Icon, Box } from "@chakra-ui/react";

export default function CompetenciaBody() {
  const {token} = useContext(AppContext)
  
 const obtenerCompetenciasByEstado = async ( estado ) =>{
    let response = await axiosApi.get(`/api/competencia/?estado=${estado}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch(()=>{
      toast.error("No se pueden obtener las categorías!")
    })
    return response.data
  }


  const sortFns = {
    ID: (array) => array.sort((a,b) => a.id-b.id),
    NOMBRE: (array) => array.sort((a,b) => a.nombre.localeCompare(b.nombre)),
    ESTADO: (array) => array.sort((a,b)=> a.estado-b.estado),
    CATEGORIAS: (array) => array.sort((a,b)=> a.categorias[0].nombre - b.categorias[0].nombre),
  }


  const columns= [
    {
      label:"Id",
      renderCell: (item) => item.id,
      sort: { sortKey: "ID" }

    },,
    {
      label:"Nombre",
      renderCell: (item) => item.nombre,
      sort: { sortKey: "NOMBRE" }
    },
    {
      label:"Estado",
      renderCell: (item) => item.estado===true ? "Activo" : "Inactivo",
    },
    {
      label: "Categorías",
      renderCell: (item) => item.categorias ? item.categorias.map(c => <Box>{c.nombre}</Box>) : null 
    },
    {
      label: "Editar",
      renderCell: (item) => <Button
    as={Link} to={`/editarCompetencia/${item.id}`}
  >
    <Icon as={AiOutlineEdit}></Icon>
  </Button>
    }
  ]
  return (
    <TablaComponent
      inputPlaceHolder={"Busca por competencia"}
      buttonPath={"/formularioCompetencia"}
      buttonMsg={"Agregar Competencia"}
      funcionSwitch={obtenerCompetenciasByEstado}
      sortFns={sortFns}
      cols={columns}
      aBuscar={"nombre"}
      ancho={"1040px"}

    />
    
  );
}

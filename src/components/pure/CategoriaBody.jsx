import { React, useContext, useEffect, useState } from "react";
import TablaComponent from "./TablaComponent";
import axiosApi from "../../utils/config/axios.config"
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppProvider";
import {AiOutlineEdit} from "react-icons/ai"
import {Link} from "react-router-dom"
import {Button, Icon} from "@chakra-ui/react";

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
    COMPETENCIA: (array) =>
    array.sort((a, b) => a.competencia.nombre.localeCompare(b.competencia.nombre)),
}




const columns = [
  { label: 'Id',
    renderCell: (item) => item.id,
    sort: { sortKey: 'ID' },
  },,
  { label: 'Nombre',
    renderCell: (item) => item.nombre,
    sort: { sortKey: 'NOMBRE' },
  },
  {
    label: 'Estado',
    renderCell: (item) => item.estado===true? "Activo":"Inactivo",
  },
  { label: 'Competencia',
    renderCell: (item) => item.competencia.nombre,
    sort: { sortKey: 'COMPETENCIA' },
  },
  {
    label: "Preguntas",
    renderCell: (item)=> 15,
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
  >
  </TablaComponent>
);
}

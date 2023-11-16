import React,{useContext, useEffect, useState} from 'react'
import TablaEstudiantes from './TablaEstudiantes';
import { Center } from '@chakra-ui/react';
import { RiEdit2Fill, RiDeleteBin2Fill} from "react-icons/ri";

export default function EstudianteBody() {
  const columns = [ "Nombres",
    "Apellidos",
    "Correo",
    "Estado",
    "Editar",
    "Eliminar",
  ];


  const columns2 = [
    {
      label: "Nombre",
      renderCell: (item)=>item.nombre,
      sort: {sorkKey:"NOMBRE"}
    },,
    {
      label: "Apellido",
      renderCell: (item)=>item.apellido,
      sort: {sortkey: "APELLIDO"}
    },
    {
      label: "Correo",
      renderCell: (item)=>item.email,
      sort: {sortKey: "CORREO"}
    },
    {
      label: "Estado",
      renderCell: (item)=>item.estado ? "Activo":"Inactivo",
      sort: {sortKey: "ESTADO"}
    },
    {
      label: "Editar",
      renderCell: (item)=><Button
    as={Link} to={`/editarCompetencia/${item.id}`}
  >
    <Icon as={AiOutlineEdit}></Icon>
  </Button>,
    },
  ]


  return (
      <TablaEstudiantes columns={columns} path={""} />
    )
}

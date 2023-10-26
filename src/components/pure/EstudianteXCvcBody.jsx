import React,{useContext, useEffect, useState} from 'react'
import TablaEstudianteXCvc from './TablaEstudianteXCvc';
import { RiEdit2Fill, RiDeleteBin2Fill} from "react-icons/ri";

export default function EstudianteXCvcBody() {
  const columns = [ "Nombres",
    "Apellidos",
    "Correo",
    "Código",
    "Expulsar",
  ];


  return (
      <TablaEstudianteXCvc columns={columns} />
    )
}

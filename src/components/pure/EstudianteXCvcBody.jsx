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
    <TablaEstudianteXCvc 
      wCampo="150px"
      ancho={"1090px"}
    />
  )
}

import React,{useContext, useEffect, useState} from 'react'
import TablaEstudianteXCvc from './TablaEstudianteXCvc';
import { RiEdit2Fill, RiDeleteBin2Fill} from "react-icons/ri";

export default function EstudianteXCvcBody() {


  return (
    <TablaEstudianteXCvc 
      wCampo="200px"
      colsR={"6"}
      showButton={"true"}
      ancho={"1040px"}
    />
  )
}

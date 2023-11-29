import React from "react";
import {useParams} from "react-router-dom";

const ResultadoConvocatoriaBody = ({}) =>{
  const {id} = useParams()
  return(
      <div>Este apartado esta en desarrollo id:{id}</div>
  )
}

export default ResultadoConvocatoriaBody;



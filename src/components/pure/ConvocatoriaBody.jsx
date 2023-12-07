import React,{useContext} from "react";
import axiosApi from "../../utils/config/axios.config"
import TablaComponent from "./TablaComponent";
import TablaConvocatoria from "./TablaConvocatoria";
import moment from "moment/moment";
import { AppContext } from "../context/AppProvider";
import { Tooltip, Button, Icon, Text} from "@chakra-ui/react";
import { AiOutlineEdit , AiOutlineEye,AiOutlineTeam } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ConvocatoriaBody() {

  


  const sortFns = {
    ID: (array) => array.sort((a,b) => a.id-b.id),
    NOMBRE: (array) => array.sort((a,b) => a.nombre.localeCompare(b.nombre)),
    FECHAINI: (array) => array.sort((a, b) => compareDates(a.fecha_inicio,b.fecha_inicio)),
    FECHAFIN: (array) => array.sort((a, b) => compareDates(a.fecha_fin,b.fecha_fin)),
    PREGUNTAS: (array) => array.sort((a,b)=> a.total_preguntas-b.total_preguntas),
    PRUEBA: (array) => array.sort((a,b) => a.prueba.nombre.localeCompare(b.prueba.nombre)),
  }


  const compareDates= (dateStringA, dateStringB) =>{
  const format = 'DD-MM-YYYY HH:mm';
  const dateA = moment(dateStringA, format);
  const dateB = moment(dateStringB, format);

  return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
  }


  return (

      <TablaConvocatoria
      inputPlaceHolder={"Busca por Convocatoria"}
      buttonPath={"/formularioConvocatoria"}
      buttonMsg={"Crear Convocatoria"}
      showButton={true}
      showSwitch={true}
      sortFns={sortFns}
      wCampo={"200px"}
      base={"265px"}
      sm={"330px"}
      md={"500px"}
      lg={"750px"}
      xl={"1000px"}
      ancho={"1250px"}
      ancho_tres={"1600px"}
      ancho_cuatro={"1750px"}
      ancho_cinco={"1850px"}
      colsR={10}
      aBuscar={"nombre"}
    />
  );
}

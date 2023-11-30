import React,{useContext} from "react";
import TablaConvocatoria from "./TablaConvocatoria";
import axiosApi from "../../utils/config/axios.config"
import TablaComponent from "./TablaComponent";
import moment from "moment/moment";
import { AppContext } from "../context/AppProvider";
import { Tooltip, Button, Icon, Text} from "@chakra-ui/react";
import { AiOutlineEdit , AiOutlineEye,AiOutlineTeam } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function ConvocatoriaBody() {

  const {token} = useContext(AppContext)
  const obtenerConvocatorias = async () =>{
    let response = await axiosApi.get("/api/convocatoria",{
       headers:{
        Authorization:"Bearer " + token,
      }
    }).catch(()=>{
      toast.error("No se pueden obtener las convocatorias!")
    })
    console.log(response.data)
    return response.data
  }


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

  const columns= [
     {
      label:"Id",
      renderCell: (item) => item.id,
      sort: { sortKey: "ID" }

    },,
    {
      label:"Nombre",
      renderCell: (item) => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.nombre}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.nombre}</Text></Tooltip>,
      sort: { sortKey: "NOMBRE" }
    },
    {
      label:"Estado",
      renderCell: (item) => item.estado?"Activo":"Inactivo",
    },
    {
      label:"Fecha de Inicio",
      renderCell: (item) => item.fecha_inicio,
      sort: { sortKey: "FECHAINI" }
    },
    {
      label:"Fecha de Fin",
      renderCell: (item) => item.fecha_fin,
      sort: { sortKey: "FECHAFIN" }
    },

    {
      label:"Prueba",
      renderCell: (item) =>  <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.prueba.nombre}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.prueba.nombre}</Text></Tooltip>,
      sort: { sortKey: "PRUEBA" }
    },
    {
      label: "Editar",
      renderCell: (item) => <Button
    as={Link} to={`/editarConvocatoria/${item.id}`}
  >
    <Icon as={AiOutlineEdit}></Icon>
  </Button>
    },
    {
      label: "Estudiantes",
      renderCell: (item) => <Button
    as={Link} to={`/convocatoria/${item.id}/estudiantes`}
  >
    <Icon as={AiOutlineTeam}></Icon>
  </Button>
    },
    {
      label: "Resultados",
      renderCell: (item) => <Button
    as={Link} to={`/resultadoConvocatoria/${item.id}`}
  >
    <Icon as={AiOutlineEye}></Icon>
  </Button>
    }
  ]

  return (
    //<TablaConvocatoria columns={columns} path={"/formularioConvocatoria"} msg={"Agregar Convocatoria"} showButton={true}/>

      <TablaComponent
      inputPlaceHolder={"Busca por Convocatoria"}
      buttonPath={"/formularioConvocatoria"}
      buttonMsg={"Crear Convocatoria"}
      funcionSwitch={obtenerConvocatorias}
      showSwitch={false}
      sortFns={sortFns}
      cols={columns}
      wCampo={"200px"}
      ancho={"1400px"}
      aBuscar={"nombre"}
    />
  );
}

import React, { useState, useContext, useEffect } from 'react'
import {Flex, Box, useMediaQuery} from "@chakra-ui/react"
import SideItem from './pure/SideItem'
import { AiOutlineFlag,
  AiOutlineHome,
  AiOutlineAppstore, 
  AiOutlineCalendar, 
  AiOutlineTeam,
  AiOutlineFileAdd,
  AiOutlineBook } from 'react-icons/ai';

import {BiLogOut} from "react-icons/bi"
import { AppContext} from './context/AppProvider';

export default function SideBar({isOpen}) {

  const { role } = useContext(AppContext);



  const navItems = [
    {icon:AiOutlineHome,msg:"Panel Principal",active:false,path:["/home","/cambiarImagen","/editarInformacion","/cambiarContrasenia"]},
    {icon:AiOutlineFlag,msg:"Competencias",active:false,path:["/competencias","/formularioCompetencia","/editarCompetencia"]},
    {icon:AiOutlineAppstore,msg:"Categorías",active:false,path:["/categorias","/formularioCategoria","/editarCategoria"]},
    {icon:AiOutlineCalendar,msg:"Preguntas",active:false,path:["/preguntas","/tipoPregunta","/formularioPreguntaSimple","/formularioPreguntaImagen","/editarPregunta"]},
    {icon:AiOutlineTeam,msg:"Estudiantes",active:false,path:["/estudiantes","/editarEstudiante"]},
    {icon:AiOutlineFileAdd,msg:"Pruebas",active:false,path:["/pruebas","/crearPrueba"]},
    {icon:AiOutlineBook,msg:"Convocatorias",active:false, path:["/convocatorias","/formularioConvocatoria"]},
  ]

  const userNavItems = [
    {icon:AiOutlineHome,msg:"Panel Principal",active:false,path:["/user", "/editarInformacionEstudiante","/cambiarContraseniaEstudiante"]},
    {icon:AiOutlineFileAdd,msg:"Pruebas",active:false,path:["/pruebasUser"]},
    {icon:AiOutlineBook,msg:"Convocatorias",active:false, path:["/convocatoriasUser"]},
  ]

  const items = role && role ==="Director" ? navItems : userNavItems
  const [w] = useMediaQuery("(min-width: 768px)");


  return (
    <>
      <Flex 
        boxSizing='border-box'
        direction={"column"}
        position={"absolute"}
        w={["70px","70px","200px"]}
        h={"100%"}
        alignItems={"center"}
        backgroundColor={"primero.100"}
        padding={"15px"}
        justifyContent={"space-between"}
        transform={ isOpen ? "translateX(-100%)" : "translateX(0px)"}
        transition={"all 0.5s"}
        overflow={"hidden"}
      >
        <Flex
          direction={"column"}
          width={"100%"}
          gap={"15px"} 
        >

          {
            items.map( ({icon, msg, active, path}, i) => <SideItem key={i} path={path} icon={icon} active={active} msg={w ? msg : ""} tamanio={w} index={i}/> ) 
          }
        </Flex>
        <SideItem icon={BiLogOut} msg={w ? "Cerrar Sesión" : ""} index={10000}></SideItem>
      </Flex>
    </>
  )
}



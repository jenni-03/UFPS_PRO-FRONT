import React,{useContext} from 'react'
import {Form} from 'react-router-dom'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormularioPasswordEstudiante from '../../../components/forms/FormularioPasswordEstudiante'

export default function CambiarContraseniaEstudiante() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormularioPasswordEstudiante/>} msg={"Cambiar Contraseña"} />
    )
}

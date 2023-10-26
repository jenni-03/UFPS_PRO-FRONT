import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormAgregarEstudiante from '../../../components/forms/FormAgregarEstudiante'
export default function AgregarEstudiante() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormAgregarEstudiante/>} msg={"Agregar Convocatoria"} />
    )
}

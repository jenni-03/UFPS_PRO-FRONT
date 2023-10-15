import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import FormularioCompetencia from '../../../components/forms/FormularioCompetencia'
import { AppContext } from '../../../components/context/AppProvider'
import FormEditarPrueba from '../../../components/forms/FormEditarPrueba'

export default function EditarPrueba() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarPrueba/>} msg={"Pruebas"} />
    )
}

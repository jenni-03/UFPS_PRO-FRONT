import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormEditarInfoUser from '../../../components/forms/FormEditarInfoUser'

export default function EditarInfoUser() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarInfoUser/>} msg={"Editar Información"} />
    )
}

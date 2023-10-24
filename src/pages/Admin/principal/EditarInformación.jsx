import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import FormEditarInfo from '../../../components/forms/FormEditarInformaciónAdmin'

export default function EditarInformacion() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<FormEditarInfo/>} msg={"Editar Información"} />
    )
}

import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import EstudianteXCvcBody from '../../../components/pure/EstudianteXCvcBody'
export default function EstudianteXConvocatoria() {
  const {open, change} = useContext(AppContext)
  return (
    <Page changeOpen={change} isOpen={open} componente={<EstudianteXCvcBody/>} msg={"Estudiantes en Convocatoria"} />
    )
}

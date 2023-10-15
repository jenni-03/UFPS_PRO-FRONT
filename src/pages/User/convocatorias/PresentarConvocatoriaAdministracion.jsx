import React,{useContext}from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import QuizTres from '../../../components/pure/QuizTres'
export default function PresentarConvocatoriaAdministracion() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<QuizTres/>} msg={"Presentación de Prueba"}/>
        )
}

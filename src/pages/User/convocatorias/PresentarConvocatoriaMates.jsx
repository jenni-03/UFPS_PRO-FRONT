import React,{useContext}from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import QuizDos from '../../../components/pure/QuizDos'
export default function PresentarConvocatoriaMates() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<QuizDos/>} msg={"Presentación de Prueba"}/>
        )
}

import React,{useContext}from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import QuizPre from '../../../components/pure/QuizPre'
export default function PresentarConvocatoria() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<QuizPre/>} msg={"Presentación de Prueba"}/>
        )
}

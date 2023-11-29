import React,{useContext}from 'react'
import { AppContext } from '../../../context/AppProvider'
import Page from '../../../container/Page'
import ResultadoConvocatoriaBody from './body/ResultadoConvocatoriaBody'

export default function ResultadoConvocatoria() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ResultadoConvocatoriaBody/>} msg={"Convocatorias"}/>
        )
}

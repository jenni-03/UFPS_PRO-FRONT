import React,{useContext}from 'react'
import { AppContext } from '../../../context/AppProvider'
import Page from '../../../container/Page'
import {useParams} from 'react-router-dom'
import ResultadosGlobalesBody from './body/ResultadosGlobalesBody'

export default function ResultadosGlobales() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ResultadosGlobalesBody/>} msg={"Resultados Globales"}/>
        )
}

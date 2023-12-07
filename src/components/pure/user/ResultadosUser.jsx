import React,{useContext}from 'react'
import { AppContext } from '../../context/AppProvider'
import Page from '../../container/Page'
import { useParams } from 'react-router-dom'
import PruebaPresentacionBody from './body/PruebaPresentacionBody'
import ResultadosUserBody from './body/ResultadosUserBody'

export default function ResultadosUser() {
    const {id} = useParams()
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ResultadosUserBody id={id}/>} msg={"Resultados Por Categoria"}/>
        )
}

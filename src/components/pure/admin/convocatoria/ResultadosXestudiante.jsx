import React,{useContext}from 'react'
import { AppContext } from '../../../context/AppProvider'
import Page from '../../../container/Page'
import {useParams} from 'react-router-dom'
import ResultadosXestudianteBody from './body/ResultadosXestudianteBody'

export default function ResultadosXestudiante() {
    const {id_conv, id_estudiante} = useParams()
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ResultadosXestudianteBody id_conv={id_conv} id_estudiante={id_estudiante}/>} msg={"Estadísticas"}/>
        )
}

import React,{useContext}from 'react'
import { AppContext } from '../../../context/AppProvider'
import Page from '../../../container/Page'
import {useParams} from 'react-router-dom'
import ResultadosAdminBody from './body/ResultadosAdminBody'

export default function ResultadosAdmin() {
    const {id} = useParams()
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ResultadosAdminBody id={id}/>} msg={"Estadíticas"}/>
        )
}

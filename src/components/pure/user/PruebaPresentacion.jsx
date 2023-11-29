import React,{useContext}from 'react'
import { AppContext } from '../../context/AppProvider'
import Page from '../../container/Page'
import PruebaPresentacionBody from './body/PruebaPresentacionBody'

export default function PruebaPresentacion() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={true} componente={<PruebaPresentacionBody/>} msg={"Presentando Prueba"}/>
        )
}

import React,{useContext}from 'react'
import { AppContext } from '../../../components/context/AppProvider'
import Page from '../../../components/container/Page'
import ConvocatoriaBodyUser from "../../../components/pure/ConvocatoriaBodyUser"
export default function Convocatorias() {
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<ConvocatoriaBodyUser/>} msg={"Convocatorias"}/>
        )
}

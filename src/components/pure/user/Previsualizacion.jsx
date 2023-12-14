import React,{useContext}from 'react'
import { AppContext } from '../../context/AppProvider'
import Page from '../../container/Page'
import PrevisualizacionBody from './body/PrevisualizacionBody'
import { useParams } from 'react-router-dom'

export default function Previsualizacion() {
    const {id} = useParams()
    const {change, open} = useContext(AppContext)
    return (
        <Page changeOpen={change} isOpen={open} componente={<PrevisualizacionBody id={id}/>} msg={"Previsualización"}/>
        )
}

import React,{useContext, useEffect} from 'react'
import toast from 'react-hot-toast'
import Page from "../../../components/container/Page"
import TablaPruebaEstudiante from '../../../components/pure/TablaPruebaEstudiante'
import axiosApi from "../../../utils/config/axios.config"
import TablaComponent from '../../../components/pure/TablaComponent'
import { Tooltip,Text,Button } from '@chakra-ui/react'
import { AppContext } from '../../../components/context/AppProvider'
import PruebaEstudianteBody from '../../../components/pure/user/body/PruebaEstudianteBody'

export default function PruebasUser() {

  const {token, change, open} = useContext(AppContext)

  return (
    <Page changeOpen={change} isOpen={open} componente={<PruebaEstudianteBody />} msg={"Pruebas Presentadas"} />
    )
}


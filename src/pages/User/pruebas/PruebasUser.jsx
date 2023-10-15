import React,{useContext} from 'react'
import Page from '../../../components/container/Page'
import { AppContext } from '../../../components/context/AppProvider'
import TablaPruebaEstudiante from '../../../components/pure/TablaPruebaEstudiante'

export default function PruebasUser() {
    
  const {open, change} = useContext(AppContext)
  const columnas =[
  "Id",
  "Nombre",
  "Competencias",
  "Categorias",
  "Puntaje",
  "Resultados"
  ]

const pruebas = [
  {
    id: 1,
    nombre: "Prueba de Administración",
    competencias: ["Genéricas", "Específicas"],
    categorias: ["Sociales", "Inglés", "Matemáticas"],
    puntaje: "50/100"
  },
  {
    id: 2,
    nombre: "Prueba de Ciencias",
    competencias: ["Genéricas", "Científicas"],
    categorias: ["Biología", "Química", "Física"],
    puntaje: "60/100"
  },
  {
    id: 3,
    nombre: "Prueba de Historia",
    competencias: ["Genéricas", "Históricas"],
    categorias: ["Historia Antigua", "Historia Moderna", "Historia Contemporánea"],
    puntaje: "45/100"
  },
  {
    id: 4,
    nombre: "Prueba de Literatura",
    competencias: ["Genéricas", "Literarias"],
    categorias: ["Poesía", "Novelas", "Teatro"],
    puntaje: "55/100"
  },
  {
    id: 5,
    nombre: "Prueba de Geografía",
    competencias: ["Genéricas", "Geográficas"],
    categorias: ["Geografía Mundial", "Geografía Regional", "Geografía Física"],
    puntaje: "48/100"
  }
];

  return (
    <Page changeOpen={change} isOpen={open} componente={<TablaPruebaEstudiante columns={columnas} pr={pruebas}/>} msg={"Pruebas Presentadas"} />
    )
}


import React,{useEffect,useContext}from "react";
import Cookies from "js-cookie";
import { SimpleGrid,Text,  CardHeader, CardBody, Button, Card , Heading, CardFooter,  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton, useDisclosure, Box, Divider, Skeleton, Flex} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axiosApi from "../../utils/config/axios.config"
import {AppContext} from "../context/AppProvider"
import {useState} from "react";
import { Badge } from '@chakra-ui/react'
import Convocatorias from "../../pages/Admin/convocatorias/Convocatorias";
import toast from "react-hot-toast";

export default function ConvocatoriaBodyUser(){
  const [convocatorias, setConvocatorias] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [convSeleccionada, setConvSeleccionada] = useState(null)
  const navigate = useNavigate()
  const cancelRef = React.useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {token, setIsInPrueba,setTiempoInicial,setIdConvocatoria, isInPrueba} = useContext(AppContext)

  const obtenerConvocatorias = async() =>{
    const response = await axiosApi.get("api/convocatoria/obtenerConvocatorias/estudiante",{
      headers : {
        Authorization: "Bearer " + token
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    if(response.status===200){
    setConvocatorias(response.data)
    setLoading(false)

    }
      }

  const presentarPrueba = async (id) =>{
    const response = await axiosApi.post(`/api/convocatoria/${id}/presentarPrueba`,{},{
      headers:{
        Authorization: "Bearer " + token
      } 
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    if(response.status===200){
      setIsInPrueba(prev => "true")
      sessionStorage.setItem("isInPrueba", true)
      sessionStorage.setItem("idConvocatoria", id)
      setTiempoInicial(prev =>response.data.tiempo_prueba*60)
      sessionStorage.setItem("time", response.data.tiempo_prueba*60)
      navigate(`/presentacionPrueba/${id}`)

    }
  }

  useEffect(()=>{
    obtenerConvocatorias()
  },[])



  return(
    <SimpleGrid 
      spacing={4} 
      width={"100%"}
      columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
    >
      {
        convocatorias && convocatorias.map((convocatoria,index)=> (
          <>
            <Card key={index} width={"auto"}>
              <CardHeader padding={"20px 20px 0 20px"} overflow={"hidden"}>
                <Heading size='md' >
                  <Skeleton isLoaded={!isLoading}>
                    <Flex gap={"20px"} alignItems={"center"} flexDir={["column","row","column","column","column","row"]} justifyContent={"space-between"}>
                      <Box>
                        {convocatoria.nombre}
                        <Box fontWeight={"normal"} color={"gray.500"}>{convocatoria.Prueba.nombre}</Box> 
                      </Box>
                      <Box display={"flex"} gap={"10px"} overflow={"hidden"} flexDir={["column","column","column","column","column"]} >
                        <Badge  justifyItems={"center"} colorScheme={"green"}>{convocatoria.fecha_inicio}</Badge>
                        <Badge colorScheme={"red"}>{convocatoria.fecha_fin}</Badge>
                      </Box>
                    </Flex>

                  </Skeleton>
                  <Flex justifyContent={"center"} alignItems={"center"} flexDir={"column"} gap={"10px"} m={"10px 0 0 0"}>

                  </Flex>
                </Heading>
              </CardHeader>
              <Divider mt={"10px"} borderColor={"gray.200"}/>
              <CardBody  padding={"20px 20px 0 20px"}>
                <Skeleton isLoaded={!isLoading}>
                  <Text>{convocatoria.descripcion}</Text>
                </Skeleton>
              </CardBody>
              <CardFooter>
                <Button width={"100%"} onClick={()=>{
                  onOpen()
                  setConvSeleccionada(convocatorias && convocatorias.find( c => c.id === convocatoria.id))
                }}>Iniciar Prueba</Button>
              </CardFooter>
            </Card>
            {
              convSeleccionada &&  <AlertDialog
                isOpen={isOpen}
                motionPreset='scale'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >

                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                      {convSeleccionada.Prueba.nombre}
                    </AlertDialogHeader>
                    <Divider/>
                    <AlertDialogBody display={"flex"} flexDir={"column"} gap={"20px"} >
                      <Box>
                        <Text fontWeight={"bold"} fontSize={"15px"}>Descripción</Text>
                        <Box>{convSeleccionada.Prueba.descripcion}</Box>
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"} fontSize={"15px"}>Duración</Text>
                        <Box>{convSeleccionada.Prueba.duracion} minutos</Box>
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"} fontSize={"15px"}>Preguntas</Text>
                        <Box>{convSeleccionada.Prueba.total_preguntas}</Box>
                      </Box>     
                      <Box>
                        <Text fontWeight={"bold"} fontSize={"15px"}>Semestre</Text>
                        <Box>{convSeleccionada.Prueba.semestre}</Box>
                      </Box>   
                    </AlertDialogBody>

                    <AlertDialogFooter display={"flex"} justifyContent={"space-between"} >
                      <Button backgroundColor={"#f9e0e4"} color={"#d10a29"} ref={cancelRef} _hover={{"backgroundColor":"none"}}  _active={{"backgroundColor":"#e89aa3"}} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button   backgroundColor={"#d8e7f5"} color={"#1285f1"} onClick={()=>{
                        presentarPrueba(convSeleccionada.id)
                        onClose()
                      }}  _hover={{"backgroundColor":"none"}} _active={{"backgroundColor":"#96bef3"}} ml={3}>
                        Comenzar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            }
          </>

        ))
      }

    </SimpleGrid>
  )
}

import React,{useEffect,useContext}from "react";
import { SimpleGrid,Text,  CardHeader, CardBody, Button, Card , Heading, CardFooter,  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton, useDisclosure, Box, Divider} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axiosApi from "../../utils/config/axios.config"
import {AppContext} from "../context/AppProvider"
import {useState} from "react";
import Convocatorias from "../../pages/Admin/convocatorias/Convocatorias";

export default function ConvocatoriaBodyUser(){
  const [convocatorias, setConvocatorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [convSeleccionada, setConvSeleccionada] = useState(null)
  const cancelRef = React.useRef()
   const { isOpen, onOpen, onClose } = useDisclosure()
  const {token} = useContext(AppContext)

  const obtenerConvocatorias = async() =>{
    const response = await axiosApi.get("api/convocatoria/obtenerConvocatorias/estudiante",{
      headers : {
        Authorization: "Bearer " + token
      }
    })
    setConvocatorias(response.data)
    setLoading(false)
  }
  useEffect(()=>{
    obtenerConvocatorias()
  },[])


  if(loading){
    return <div>Cargando...</div>
  }

  return(
    <SimpleGrid spacing={4} 
      columns={{ base: 1, md: 2, lg: 3 }}
    >
           {
        convocatorias && convocatorias.map((convocatoria,index)=> (
          <>
          <Card key={index}>
            <CardHeader>
              <Heading size='md'>{convocatoria.nombre}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{convocatoria.descripcion}</Text>
            </CardBody>
            <CardFooter>
              <Button onClick={()=>{
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
              {convSeleccionada.prueba.nombre}
            </AlertDialogHeader>
            <Divider/>
            <AlertDialogBody display={"flex"} flexDir={"column"} gap={"20px"} >
              <Box>
              <Text fontWeight={"bold"} fontSize={"15px"}>Descripción</Text>
              <Box>{convSeleccionada.prueba.descripcion}</Box>
              </Box>
              <Box>
             <Text fontWeight={"bold"} fontSize={"15px"}>Duración</Text>
              <Box>{convSeleccionada.prueba.duracion} minutos</Box>
              </Box>
               <Box>
             <Text fontWeight={"bold"} fontSize={"15px"}>Preguntas</Text>
              <Box>{convSeleccionada.prueba.total_preguntas}</Box>
              </Box>     
             <Box>
               <Text fontWeight={"bold"} fontSize={"15px"}>Semestre</Text>
              <Box>{convSeleccionada.prueba.semestre}</Box>
              </Box>   
            </AlertDialogBody>

            <AlertDialogFooter display={"flex"} justifyContent={"space-between"} >
              <Button backgroundColor={"#f9e0e4"} color={"#d10a29"} ref={cancelRef} _hover={{"backgroundColor":"none"}}  _active={{"backgroundColor":"#e89aa3"}} onClick={onClose}>
                Cancelar
              </Button>
              <Button as={Link} to="/presentarConvocatoria" backgroundColor={"#d8e7f5"} color={"#1285f1"} onClick={onClose}  _hover={{"backgroundColor":"none"}} _active={{"backgroundColor":"#96bef3"}} ml={3}>
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

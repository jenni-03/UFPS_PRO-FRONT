import React,{useState, useContext, useEffect} from "react";
import { AppContext } from "../context/AppProvider";
import Paginacion from "./Paginacion";
import { toast } from "react-hot-toast";
import axiosApi from "../../utils/config/axios.config"
import Btn from "../pure/Btn"
import { MdAdd } from "react-icons/md";
import { Box,Flex,Table,Thead,Tr,Th,Skeleton,Tbody,Td,Button,Link,Icon,Text,AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton, useDisclosure} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import {useParams, useNavigate} from "react-router-dom";
import {useRef} from "react";
const TablaEstudianteXCvc = ({columns,showButton=true, path}) =>{
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const navigate= useNavigate()
  const itemsPerPage = 5;
  const [estudiantes,setEstudiantes] = useState()
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const [isLoading, setLoading] = useState(true)
  const [estudianteSelect, setEstudianteSelect] = useState()
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { token } = useContext(AppContext);
  const {id} = useParams()
  const currentItems = estudiantes && estudiantes.slice(indexOfFirstItem, indexOfLastItem);
  const cancelRef = useRef()
  const totalPages = estudiantes && Math.ceil(estudiantes.length / itemsPerPage);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handlePageChange = (selected) => {
    if (selected >= indexF) {
      setIndexI(selected);
      setIndexF(selected + 5);
    }
    setCurrentPage(selected);
  };

  const atrasPage = () => {
    currentPage <= indexI && indexI != 0 ? paginacionAtras() : null;

    currentPage > 0 ? handlePageChange(currentPage - 1) : null;
  };

  const adelantePage = () => {
    currentPage >= indexF - 1 ? paginacionAdelante() : null;
    currentPage < totalPages - 1 ? handlePageChange(currentPage + 1) : null;
  };

  const paginacionAdelante = () => {
    setIndexI(indexI + 5);
    setIndexF(indexF + 5);
  };

  const paginacionAtras = () => {
    setIndexI(indexI - 5);
    setIndexF(indexF - 5);
  };

  useEffect(()=>{
    obtenerEstudiantes()
  },[])

  useEffect(()=>{
    obtenerEstudiantes()
  },[estudiantes])
  const obtenerEstudiantes = async () =>{
    const response = await axiosApi.get(`/api/convocatoria/${id}/getEstudiantes`,{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    setEstudiantes(response.data)
    setLoading(false)
  }

  const expulsarEstudiante = async (id_estudiante) =>{
    const response = await axiosApi.delete(`/api/convocatoria/${id}/ejectStudent/${id_estudiante}`,{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch(e=>{
      toast.error("No se pudo realizar la expulsión")
    })

    if(response.status===200){
      onClose()
      toast.success("¡Estudiante expulsado correctamente!")
    }
  }




  return(
<Box>
      {showButton && (
        <Skeleton isLoaded={!isLoading}>
        <Btn
          msg={"Agregar Estudiante"}
          leftIcon={<MdAdd />}
          path={`/convocatoria/${id}/agregarEstudiante`}
          w={["100%","100%", "250px"]}
        />
        </Skeleton>
      )}
      <Box mb="15px" mt="20px" p="20px" borderRadius="8px" bgColor="white"
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
      >
        <Flex
          w={{
            base: "240px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            xl: "100%",
          }}
          gap={["8px", "0"]}
          direction={["column", "row"]}
          justifyContent={["flex-start", "space-between"]}
          alignItems="center"
          overflowX="auto"
        >
          <Box w="100%" overflowX="auto" mb={4}>
            <Table w="100%">
              <Thead>
                <Tr>
                  {columns && columns.map((column, index) => (
                    <Th
                      textAlign="center"
                      key={index}
                      style={{
                        borderBottom: "2px solid",
                        borderBottomColor: "principal.100",
                      }}
                    >
        <Skeleton isLoaded={!isLoading}>
                      {column}
          </Skeleton>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
               {estudiantes && currentItems.map((item, index) => (
                  <Tr key={index}>
                      <Td>
        <Skeleton isLoaded={!isLoading}>
                         <Box w={"100%"} textAlign={"center"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.nombre}
                         </Box>
          </Skeleton>
                      </Td>
                       <Td>
        <Skeleton isLoaded={!isLoading}>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.apellido}
                      </Box>
          </Skeleton>
                      </Td>
                       <Td>
        <Skeleton isLoaded={!isLoading}>
                         <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.correo}
                         </Box>
          </Skeleton>
                      </Td>
                      <Td>
        <Skeleton isLoaded={!isLoading}>
                         <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.codigo}
                         </Box>
          </Skeleton>
                      </Td>
                     <Td>{
        <Skeleton isLoaded={!isLoading}>
          <Button display={"flex"} justifyContent={"center"} h={"30px"} w={"100%"} alignItems={"center"} backgroundColor={"segundo.100"} variant={"unstyled"} onClick={()=>{
            onOpen()
            setEstudianteSelect(estudiantes.find(e => e.id === item.id))

            }}>
                        <Icon color={"primero.100"} as={AiOutlineDelete} />
                      </Button>
          </Skeleton>
                      }</Td>
                  </Tr>
                    
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
 <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>¿Estas Seguro?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {
              estudianteSelect ?
                <Box display={"flex"} flexDir={"column"} gap={"15px"}>
                  <Text>¿Deseas expulsar de esta convocatoria a {estudianteSelect.nombre} {estudianteSelect.apellido}?</Text> 
                  <Text display={"flex"} gap={"10px"}><Text fontSize={"16"} fontWeight={"bold"}>Código:</Text>  {estudianteSelect.codigo}</Text>
                </Box>
                :
                <Text>No se pudo traer los valores del estudiante</Text>
                  }
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={()=>{
                expulsarEstudiante(estudianteSelect.id)
              }}>
              Si
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </Box>
           <Paginacion
        currentPage={currentPage}
        totalPages={isLoading ? 1 :totalPages}
        indexI={indexI}
        indexF={indexF}
        handlePageChange={handlePageChange}
        atrasPage={atrasPage}
        adelantePage={adelantePage}
        isLoaded={!isLoading}
      />
    </Box>

   ) 
}

export default TablaEstudianteXCvc

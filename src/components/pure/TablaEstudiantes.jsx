import React, { useEffect, useState,useContext } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Button,
  Icon,
  Switch,
  useEditable,
  FormLabel
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Boton from "../pure/Boton";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from 'react-hot-toast';
import Paginacion from "./Paginacion";
import { AiOutlineEye } from "react-icons/ai";
export default function TablaEstudiantes({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const [estudiantes, setEstudiantes] = useState()
  const itemsPerPage = 5;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [showActive,setShowActive] = useState(false);

  const {token} = useContext(AppContext)

  const currentItems = estudiantes && estudiantes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = estudiantes && Math.ceil(estudiantes.length / itemsPerPage);

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

  const obtenerEstudiantes = async ( id ) =>{
    let response = await axiosApi.get(`/api/user/student?estado=${id}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error(e.response.data.error)
     })
     setEstudiantes(response.data)
  }

 useEffect(()=>{
  obtenerEstudiantes(1)
 },[]) 

  return (
    <Box>
       <Flex align={"center"} gap={"5px"}>
        <FormLabel id="switch" m={"0"}>Mostrar Inactivos</FormLabel> 
        <Switch id="switch" colorScheme="cyan"  onChange={(e)=>{
            setCurrentPage(0)
            setShowActive(!showActive)
            showActive===true ? obtenerEstudiantes(1) : obtenerEstudiantes(0)
        }}/>
        </Flex>
      <Box mb="15px" mt="20px" p="20px" borderRadius="8px" bgColor="white"
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
      >
        <Flex
          w={{
            base: "240px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            tableBreakpoint: "100%",
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
                  {columns.map((column, index) => (
                    <Th
                      textAlign="center"
                      key={index}
                      style={{
                        borderBottom: "2px solid",
                        borderBottomColor: "primero.100",
                      }}
                    >
                      {column}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {estudiantes && estudiantes.map((item, index) => (
                  <Tr key={index}>
                      <Td>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    {item.nombre}
                        </Box>
                        </Td>
                      <Td>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    {item.apellido}
                        </Box>
                        </Td>
                      <Td>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    {item.email}
                          </Box>
                        </Td>
                      <Td>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    {item.estado ? "Activo" : "Inactivo"}
                        </Box>
                        </Td>
                    <Td>{
                        <Button display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor={"segundo.100"} h={"30px"} as={Link} to={`/editarEstudiante/${item.id}`}>
                        <Icon color={"primero.100"} as={AiOutlineEdit}/>
                        </Button>
                        }</Td>
                    <Td display={"flex"} alignItems={"center"} justifyContent={"center"}>{
                        <Button display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor={"segundo.100"} h={"30px"} w={"55px"}as={Link} to={`/estudiante/resultados`}>
                        <Icon color={"primero.100"} as={AiOutlineEye}/>
                        </Button>
                    }</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    <Paginacion
        currentPage={currentPage}
        totalPages={totalPages}
        indexI={indexI}
        indexF={indexF}
        handlePageChange={handlePageChange}
        atrasPage={atrasPage}
        adelantePage={adelantePage}
      />
    </Box>
  );
}

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
  FormLabel,
  Skeleton
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from 'react-hot-toast';
import Paginacion from "./Paginacion";
export default function TablaEstudiantes({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const [estudiantes, setEstudiantes] = useState()
  const itemsPerPage = 5;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [showActive,setShowActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

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
    console.log(response.data)
    setEstudiantes(response.data)
    setIsLoading(false)
  }

  useEffect(()=>{
    obtenerEstudiantes(1)
  },[]) 

  return (
    <Box>
      <Flex align={"center"} gap={"5px"} justifyContent={"flex-end"}>
        <Skeleton isLoaded={!isLoading}>
          <FormLabel id="switch" m={"0"}>Mostrar Inactivos</FormLabel> 
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Switch id="switch" colorScheme="cyan"  onChange={(e)=>{
            setCurrentPage(0)
            setShowActive(!showActive)
            showActive===true ? obtenerEstudiantes(1) : obtenerEstudiantes(0)
          }}/>
        </Skeleton>
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
                      <Skeleton isLoaded={!isLoading}>
                        {column}
                      </Skeleton>
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {estudiantes && estudiantes.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {item.nombre}
                        </Box>
                      </Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {item.apellido}
                        </Box>
                      </Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {item.email}
                        </Box>
                      </Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                          {item.estado ? "Activo" : "Inactivo"}
                        </Box>
                      </Skeleton>
                    </Td>
                    <Td>{
                      <Skeleton isLoaded={!isLoading}>
                        <Button display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor={"segundo.100"} h={"30px"} as={Link} to={`/editarEstudiante/${item.id}`}>
                          <Icon color={"primero.100"} as={AiOutlineEdit}/>
                        </Button>
                      </Skeleton>
                      }</Td>
                    <Td display={"flex"} alignItems={"center"} justifyContent={"center"}>{
                      <Skeleton isLoaded={!isLoading}>
                        <Button display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor={"segundo.100"} h={"30px"} w={"55px"}as={Link} to={`/estudiante/resultados`}>
                          <Icon color={"primero.100"} as={AiOutlineDelete}/>
                        </Button>
                      </Skeleton>
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
        totalPages={isLoading ? 1 :totalPages}
        indexI={indexI}
        indexF={indexF}
        handlePageChange={handlePageChange}
        atrasPage={atrasPage}
        adelantePage={adelantePage}
        isLoaded={!isLoading}
      />
    </Box>
  );
}

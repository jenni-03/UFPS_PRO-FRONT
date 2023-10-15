import React, { useEffect, useState, useContext } from "react";
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
  useEditable,
  FormLabel,
  Switch,
  Text
} from "@chakra-ui/react";
import Boton from "../pure/Boton";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import Paginacion from "./Paginacion";
import Btn from "./Btn";const pruebas = [
  {
    id: 1,
    nombre: "Prueba de Administración",
    competencias: ["Genéricas", "Específicas"],
    categorías: ["Sociales", "Inglés", "Matemáticas"],
    puntaje: "50/100"
  },
  {
    id: 2,
    nombre: "Prueba de Ciencias",
    competencias: ["Genéricas", "Científicas"],
    categorías: ["Biología", "Química", "Física"],
    puntaje: "60/100"
  },
  {
    id: 3,
    nombre: "Prueba de Historia",
    competencias: ["Genéricas", "Históricas"],
    categorías: ["Historia Antigua", "Historia Moderna", "Historia Contemporánea"],
    puntaje: "45/100"
  },
  {
    id: 4,
    nombre: "Prueba de Literatura",
    competencias: ["Genéricas", "Literarias"],
    categorías: ["Poesía", "Novelas", "Teatro"],
    puntaje: "55/100"
  },
  {
    id: 5,
    nombre: "Prueba de Geografía",
    competencias: ["Genéricas", "Geográficas"],
    categorías: ["Geografía Mundial", "Geografía Regional", "Geografía Física"],
    puntaje: "48/100"
  }
];

export default function TablaPrueba({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const [showActive, setShowActive] = useState(false);
  const [pruebas,setPruebas] = useState();
  const {token} = useContext(AppContext)
  const itemsPerPage = 5;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = pruebas && pruebas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = pruebas && Math.ceil(pruebas.length / itemsPerPage);

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

  const obtenerActivos = async (estado) =>{
    let response = await axiosApi.get(`/api/prueba/?estado=${estado}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
    setPruebas(response.data)

  }

  useEffect(()=>{
    obtenerActivos(1)
  },[])

  return (
    <div>
      {showButton && (

        <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={"space-between"}>
        <Btn
          msg={msg}
          leftIcon={<MdAdd/>}
          path={path}
          w={["100%", "250px"]}

        >

        </Btn>

        <Flex align={"center"} gap={"5px"}>
            <FormLabel id="switch" m={"0"}>Mostrar Inactivos</FormLabel>
            <Switch id="switch" colorScheme="cyan" onChange={(e) => {
              setCurrentPage(0)
              setShowActive(!showActive)
              showActive === true ? obtenerActivos(1) : obtenerActivos(0)
            }} />
          </Flex>


        </Flex>
        
      )}
      <Box mb="15px" mt="20px" p="20px" borderRadius="8px" bgColor="white" 
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
      >
        <Flex
          // w={["190px", "350px", "510px", "700px"]}
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
                        borderBottomColor: "principal.100",
                      }}
                    >
                      {column}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {pruebas && currentItems.map((item, index) => (
                  <Tr key={index}>
                    <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {item.id}
                      </Box>
                      </Td>
                    <Td>{item.nombre}</Td>
                    <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.semestre}
                      </Box>
                    </Td>
                    <Td>
                        <Box w={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDir={"column"}>
                    {
                      item.competencias.map((data,index)=>(
                        <Text>{data.nombre}</Text>
                      ))
                      }
                        </Box>
                    </Td>
                    <Td>
                      <Button as={Link} display={"flex"} h={"30px"} justifyItems={"center"} justifyContent={"center"} backgroundColor={"segundo.100"} to={`/editarPrueba/${item.id}`}>
                        <Icon color={"primero.100"} as={AiOutlineEdit}></Icon>
                      </Button>
                    </Td>
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
    </div>
  );
}

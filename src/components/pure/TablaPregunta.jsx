import React, { useEffect, useState, useContext} from "react";
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
  Switch
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Boton from "../pure/Boton";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import Btn from "../pure/Btn"
import { toast } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import Paginacion from "./Paginacion";

export default function TablaPregunta({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const itemsPerPage = 5;
  const { token } = useContext(AppContext);
  const [preguntas, setPreguntas] = useState()
  const [showActive, setShowActive] = useState(false);
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = preguntas && preguntas.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = preguntas && Math.ceil(preguntas.length / itemsPerPage);

  const handlePageChange = (selected) => {
    if (selected >= indexF) {
      setIndexI(selected);
      setIndexF(selected + 5);
    }
    setCurrentPage(selected);
  };

  const obtenerActivos = async (estado) => {
    let response = await axiosApi.get(`/api/question/?estado=${estado}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).catch(() => {
      toast.error("No se pueden obtener las preguntas!")
    })
    setPreguntas(response.data)
  }


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

  useEffect(() => {
    obtenerActivos(1)
  }, [])

  return (
    <Box >
      {showButton && (
        <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={"space-between"}>
          {/*<Boton
            msg={msg}
            leftIcon={<MdAdd />}
            as={Link}
            path={path}
            w={["100%", "250px"]}
            radius={"8px"}
        />*/}
          <Btn
            leftIcon={<MdAdd/>}
            path={path}
            msg={"Agregar Pregunta"}
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
                {preguntas && currentItems.map((item, index) => (

                  <Tr key={item.id}>
                    <Td>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    {item.id}
                        </Box>
                        </Td>
                    <Td
                      maxW={"300px"}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}

                    >
                    {item.texto_pregunta}</Td>
                    <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.semestre}
                        </Box>
                    </Td>
                    <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {item.estado ? "Activo" : "Inactivo"}
                      </Box>
                      </Td>
                    <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {item.categoria.nombre}
                      </Box>
                      </Td>
                    <Td>{
                      <Button display={"flex"} justifyContent={"center"} h={"30px"} alignItems={"center"} backgroundColor={"segundo.100"} variant={"unstyled"} as={Link} to={`/editarPregunta/${item.id}`}>
                        <Icon color={"primero.100"} as={AiOutlineEdit} />
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

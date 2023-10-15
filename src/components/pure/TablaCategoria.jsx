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
  Switch,
  FormLabel,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Boton from "../pure/Boton";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import {AiOutlineEdit} from "react-icons/ai"
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast } from "react-hot-toast";
import Paginacion from "./Paginacion";
import Btn from "./Btn";
export default function TablaCategoria({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const [showActive, setShowActive] = useState(false);
  const itemsPerPage = 5;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { token } = useContext(AppContext);
  const [categorias, setCategorias] = useState()
  const currentItems = categorias && categorias.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = categorias && Math.ceil(categorias.length / itemsPerPage);

  const obtenerActivos = async (estado) => {
    let response = await axiosApi.get(`/api/categoria/?estado=${estado}`, {
      headers: {
        Authorization: "Bearer " + token,
      }
    }).catch(() => {
      toast.error("No se pueden obtener las categorías!")
    })
    setCategorias(response.data)
    "" 
  }


  useEffect(() => {
    obtenerActivos(1)
  }, [])

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

  return (
    <Box >
      {showButton && (
        <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={"space-between"}>

          <Btn path={path} w={["100%","250px"]} leftIcon={<MdAdd/>} msg={msg}></Btn>
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
                {categorias && currentItems.map((item, index) => (

                  <Tr key={item.id}>
                    <Td>
                      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    {item.id}
                      </Box>
                      </Td>
                    <Td>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    {item.nombre}
                        </Box>
                        </Td>
                    <Td>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    {item.estado ? "Activo" : "Inactivo"}
                        </Box>
                        </Td>
                    <Td>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    {item.competencia.nombre}
                        </Box>
                        </Td>
                    <Td>{
                      <Button display={"flex"} alignItems={"center"} h={"30px"} justifyContent={"center"} backgroundColor={"segundo.100"} as={Link} to={`/editarCategoria/${item.id}`}>
                       <Icon color={"principal.100"} as={AiOutlineEdit} />
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

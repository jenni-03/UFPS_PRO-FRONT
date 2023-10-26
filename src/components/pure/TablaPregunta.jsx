import React, { useEffect, useRef, useState, useContext} from "react";
import {
  Table,
  Input,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Button,
  Icon,
  FormLabel,
  Switch,
  Skeleton
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import Btn from "../pure/Btn"
import { toast } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { MdAdd} from "react-icons/md";
import Paginacion from "./Paginacion";


export default function TablaPregunta({ columns, items, path, msg, showButton }) {
  const inputRef = useRef()
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [preguntas, setPreguntas] = useState([])
  const [showActive, setShowActive] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(preguntas && Math.ceil(preguntas.length / itemsPerPage))
  const [preguntasTabla, setPreguntasTabla] = useState([])
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { token } = useContext(AppContext);
  const [currentItems, setCurrentItems] = useState([]);



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
    setLoading(false)
  }

  const buscarPregunta = (msg) =>{
    const res = preguntas && preguntas.filter(pregunta => pregunta.texto_pregunta.startsWith(msg))
    setPreguntasTabla(res)
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

  useEffect(() => {
  const itemsToDisplay = inputRef.current && inputRef.current.value !== "" ? preguntasTabla : preguntas;
  setCurrentItems(itemsToDisplay.slice(indexOfFirstItem, indexOfLastItem));
}, [inputRef.current, preguntas, preguntasTabla, indexOfFirstItem, indexOfLastItem]);
  
  useEffect(()=>{
    setTotalPages(preguntas && Math.ceil(preguntas.length / itemsPerPage))
  },[preguntas])

  useEffect(() => {
  setTotalPages(preguntas && itemsPerPage && Math.ceil(preguntasTabla.length / itemsPerPage))
    console.log(totalPages)
    console.log("itemsxpagina",itemsPerPage)
}, [preguntasTabla]);

  return (
    <Box >
      {showButton && (
        <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={"space-between"}>
          <Skeleton isLoaded={!isLoading}>
          <Btn
            leftIcon={<MdAdd/>}
            path={path}
            msg={"Agregar Pregunta"}
            w={["100%", "250px"]}
          >
          </Btn>
          </Skeleton>
          <Flex align={"center"} gap={"5px"}>
          <Skeleton isLoaded={!isLoading}>
            <FormLabel id="switch" m={"0"}>Mostrar Inactivos</FormLabel>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <Switch id="switch" colorScheme="cyan" onChange={(e) => {
              setCurrentPage(0)
              setShowActive(!showActive)
              showActive === true ? obtenerActivos(1) : obtenerActivos(0)
            }} />
            </Skeleton>
          </Flex>
        </Flex>
      )}
      <Skeleton h={"40px"} isLoaded={!isLoading}>
      <Box m={"15px 0"}>
      <Input onChange={()=>buscarPregunta(inputRef.current.value)} ref={inputRef} w={"100%"} placeholder="Busca tu pregunta"></Input>
      </Box>
      </Skeleton>
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
                {inputRef.current && inputRef.current.value === "" ? preguntas && currentItems.map((item, index) => (

                  <Tr key={item.id}>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} w={"100%"}>
                    {item.id}
                        </Box>
                        </Skeleton>
                        </Td>
                    <Td
                      maxW={"300px"}
                      textOverflow={"ellipsis"}
                      overflow={"hidden"}
                      whiteSpace={"nowrap"}

                    >
                      <Skeleton isLoaded={!isLoading}>
                    {item.texto_pregunta}
                      </Skeleton>
                      </Td>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.semestre}
                        </Box>
                        </Skeleton>
                    </Td>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {item.estado ? "Activo" : "Inactivo"}
                      </Box>
                      </Skeleton>
                      </Td>
                    <Td>
                      <Skeleton isLoaded={!isLoading}>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {item.categoria.nombre}
                      </Box>
                      </Skeleton>
                      </Td>
                    <Td>{
                      <Skeleton isLoaded={!isLoading}>
                      <Button display={"flex"} justifyContent={"center"} h={"30px"} alignItems={"center"} backgroundColor={"segundo.100"} variant={"unstyled"} as={Link} to={`/editarPregunta/${item.id}`}>
                        <Icon color={"primero.100"} as={AiOutlineEdit} />
                      </Button>
                        </Skeleton>
                      }</Td>
                  </Tr>

                )) : preguntasTabla && currentItems.map((item, index) => (

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
        isLoaded={!isLoading}
      />
    </Box>
  );
}

import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Boton from "../pure/Boton";
import { useRef, useContext } from "react";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-hot-toast";
import { RiEdit2Fill } from "react-icons/ri";
import { MdAdd, MdChevronLeft, MdChevronRight } from "react-icons/md";
import Btn from "./Btn";
import Paginacion from "./Paginacion";

export default function TablaConvocatoria({ columns, items, path, msg, showButton }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [indexI, setIndexI] = useState(0);
  const [indexF, setIndexF] = useState(5);
  const itemsPerPage = 5;
  const [convocatorias,setConvocatorias] = useState()
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { token } = useContext(AppContext);

  const currentItems = convocatorias && convocatorias.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = convocatorias && Math.ceil(convocatorias.length / itemsPerPage);


  const getConvocatorias = async () =>{
    let response = await axiosApi.get("/api/convocatoria",{
       headers:{
        Authorization:"Bearer " + token,
      }
    }).catch(()=>{
      toast.error("No se pueden obtener las convocatorias!")
    })
    setConvocatorias(response.data)
  }

  useEffect(()=>{
    getConvocatorias()
  },[])


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
    <Box>
      {showButton && (
        <Btn
          msg={msg}
          leftIcon={<MdAdd />}
          path={path}
          w={["100%", "250px"]}
        />
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
                {convocatorias && currentItems.map((item, index) => (
                  <Tr key={index}>
                    
                      <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.id}
                      </Box>
                      </Td>
                      <Td>
                        {item.nombre}
                      </Td>
                       <Td>
                      <Box w={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {item.estado ? "Activo" : "Inactivo"}
                      </Box>
                      </Td>
                       <Td>
                        {item.fecha_inicio.toString().replace("T00:00:00.000Z","")}
                      </Td>
                      <Td>
                        {item.fecha_fin.toString().replace("T00:00:00.000Z","")}
                      </Td>
                         <Td>{
                        <Button variant={"unstyled"} as={Link} to={`/editarConvocatoria/${item.id}`}>
                        <Icon w={"20px"} h={"20px"} as={RiEdit2Fill}/>
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

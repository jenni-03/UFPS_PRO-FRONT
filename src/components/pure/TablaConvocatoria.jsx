import React, {useState, useEffect, useRef, useContext} from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useCustom } from '@table-library/react-table-library/table';
import axiosApi from '../../utils/config/axios.config'
import { AppContext } from '../context/AppProvider';
import { toast } from 'react-hot-toast';
import { useTheme } from "@table-library/react-table-library/theme";
import Btn from "./Btn";
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Link } from 'react-router-dom';
import { BiCheckCircle } from "react-icons/bi";
import { FaChevronDown, FaChevronUp, FaSearch, FaChevronLeft, FaChevronRight, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import {AiOutlineEdit, AiOutlineTeam, AiOutlineEye} from "react-icons/ai"
import { MdAdd } from "react-icons/md";
import {AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,Icon, Box, Stack, InputGroup,Tooltip, InputLeftElement, Input, HStack, IconButton, Button, Flex, Skeleton, Text, Switch, Badge} from '@chakra-ui/react';

const TablaConvocatoria = ({aBuscar,colsR,sortFns,wCampo, showButton=false, showSwitch=true, base,sm,md,lg,xl,ancho,ancho_tres,ancho_cuatro,ancho_cinco,inputPlaceHolder, buttonPath, buttonMsg}) => {

  const inputPageRef = useRef(null)
  const {token}= useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [convocatoriaSelect, setConvocatoriaSelect] = useState()
  const [reloadData, setReloadData] = useState(false);
  const [active, setActive] = useState(false)
  const [convocatorias, setConvocatorias] = useState([])
  const cancelRef = useRef()

  const obtenerConvocatoriasByEstado= async (estado) =>{
    let response = await axiosApi.get(`/api/convocatoria/?estado=${estado}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch(()=>{
      toast.error("No se pueden obtener las convocatorias!")
    })
    if(response.status===200){
      setConvocatorias(response.data)
      pagination.fns.onSetPage(0)
      setLoading(false)
    }
  }

  const finalizarConvocatoria = async (id) =>{
    const response = await axiosApi.put(`/api/convocatoria/${id}/cerrarConvocatoria`,{},{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch((e)=>{
      toast.error("Error al finalizar la convocatoria")
    })
    console.log(response)
    if(response.status===200){
      onClose()
      console.log(response)
      toast.success("¡Convocatoria finalizada con éxito!")
      setReloadData(true);
    }
      
  }




  useEffect(() => {
    obtenerConvocatoriasByEstado(1);
    setReloadData(false); // Resetear el estado después de recargar datos
  }, [reloadData]);




  let data
  const nodes = convocatorias

  data = { nodes }




  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  //--data-table-library_grid-template-columns:  200px;
  const customTheme = {
    Table: `
        --data-table-library_grid-template-columns:  repeat(${colsR},${wCampo});
      font-family: Open Sans;
    `,
  };

  const theme = useTheme([chakraTheme, customTheme]);

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

  function onSearchChange(action, state) {
    pagination.fns.onSetPage(0);
  }

  data = {
    nodes: data.nodes && data.nodes.filter((item) =>
      item[aBuscar].toLowerCase().includes(search.toLowerCase())
    ),
  };


  // SORT 


  const sort = useSort(
    data,
    {
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns:sortFns

    },
  );


  // PAGINATION 

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
  });


  const nextPage = () =>{
    pagination.fns.onSetPage(pagination.state.page + 1)
  }

  const prevPage = () =>{
    pagination.fns.onSetPage(pagination.state.page - 1)
  }

  const getTotalPages = () => pagination.state.getTotalPages(data.nodes && data.nodes)

  const isEmpty = () => getTotalPages()===0

  const isDisabledRight = () => isEmpty() ? true : pagination.state.page+1 === getTotalPages()
  const isDisabledLeft = () => pagination.state.page === 0

  const pageIndicator = () => <Text>{isEmpty() ? pagination.state.page : pagination.state.page+1} de {getTotalPages()}</Text>

    const COLUMNS=[
      {
        label:"Id",
        renderCell: (item) => item.id,
        sort: { sortKey: "ID" }

      },
      {
        label:"Nombre",
        renderCell: (item) => <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.nombre}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.nombre}</Text></Tooltip>,
        sort: { sortKey: "NOMBRE" }
      },
      {
        label:"Estado",
        renderCell: (item) => item.estado?"Activo":"Inactivo",
      },
      {
        label:"Fecha de Inicio",
        renderCell: (item) => item.fecha_inicio,
        sort: { sortKey: "FECHAINI" }
      },
      {
        label:"Fecha de Fin",
        renderCell: (item) => item.fecha_fin,
        sort: { sortKey: "FECHAFIN" }
      },

      {
        label:"Prueba",
        renderCell: (item) =>  <Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.prueba.nombre}><Text  maxW={"auto"} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" >{item.prueba.nombre}</Text></Tooltip>,
        sort: { sortKey: "PRUEBA" }
      },
      {
        label: "Editar",
        renderCell: (item) => <Button
          as={Link} to={`/editarConvocatoria/${item.id}`}
        >
          <Icon as={AiOutlineEdit}></Icon>
        </Button>
      },
      {
        label: "Estudiantes",
        renderCell: (item) => <Button
          as={Link} to={`/convocatoria/${item.id}/estudiantes`}
        >
          <Icon as={AiOutlineTeam}></Icon>
        </Button>
      },
      {
        label: "Resultados",
        renderCell: (item) => <Button
          as={Link} to={`/resultadoConvocatoria/${item.id}`}
        >
          <Icon as={AiOutlineEye}></Icon>
        </Button>
      },
      {
        label: "Finalizar",
        renderCell: (item) => <Button
          onClick={()=>{
            onOpen()
            setConvocatoriaSelect(convocatorias.find(e => e.id === item.id))
          }
          }
        >
          <Icon as={BiCheckCircle}></Icon>
        </Button>
      }
    ] 
  return (
    <>
      <Box 
        w={{
          base: base,
          sm: sm,
          md: md,
          lg: lg,
          xl: xl,
          '2xl':ancho,
          "3xl":ancho_tres,
          "4xl":ancho_cuatro,
          "5xl":ancho_cinco
        }}
      >
        <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={showButton ? "space-between" : "flex-end"} mb={"20px"}>
          {showButton && (
            <Skeleton isLoaded={!isLoading}>
              <Btn
                leftIcon={<MdAdd/>}
                path={buttonPath}
                msg={buttonMsg}
                w={["100%", "250px"]}
              >
              </Btn>
            </Skeleton>
          )}
          { showSwitch && 
            <Flex align={"center"} gap={"5px"}>
              <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
                <Text id="switch" m={"0"}>Mostrar Inactivos</Text>
              </Skeleton>
              <Skeleton  borderRadius={"10px"}  isLoaded={!isLoading}>
                <Switch id="switch" colorScheme="cyan" onChange={(e) => {
                  setActive(!active)
                  active === true ? obtenerConvocatoriasByEstado(1) : obtenerConvocatoriasByEstado(0)
                }} />
              </Skeleton>
            </Flex>}
        </Flex>

        <Stack spacing={10}>
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch style={{ color: '#4a5568' }} />}
              />
              <Input w={"100%"} placeholder={inputPlaceHolder} value={search} onChange={handleSearch} />
            </InputGroup>
          </Skeleton>
        </Stack>

        <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
          <Box   
            mb="15px"
            mt="20px"
            p="20px"
            w={{
              base: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            }}
            borderRadius="8px"
            bgColor="white"
            boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
          >
            <CompactTable  columns={COLUMNS} data={data} sort={sort} theme={theme}  pagination={pagination} layout={{ custom: true, horizontalScroll: true }} />
          </Box>
        </Skeleton>
        <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
          <HStack justify="center">
            <IconButton
              aria-label="previous page"
              icon={<FaChevronCircleLeft/>}
              color={"primero.100"}
              variant="ghost"
              isDisabled={isDisabledLeft()}
              onClick={() => pagination.fns.onSetPage(0)}
            />
            <IconButton
              aria-label="previous page"
              icon={<FaChevronLeft />}
              color={"primero.100"}
              variant="ghost"
              isDisabled={isDisabledLeft()}
              onClick={() => prevPage()}
            />
            {pageIndicator()}
            <IconButton
              aria-label="next page"
              icon={<FaChevronRight />}
              color={"primero.100"}
              variant="ghost"
              isDisabled={isDisabledRight()}
              onClick={() => nextPage()}
            />
            <IconButton
              aria-label="previous page"
              icon={<FaChevronCircleRight/>}
              color={"primero.100"}
              variant="ghost"
              isDisabled={isDisabledRight()}
              onClick={() => pagination.fns.onSetPage(getTotalPages()-1)}
            />
          </HStack>
        </Skeleton>
        <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
          <Flex width={"100%"} mt={"10px"} justifyContent={"center"} gap={"15px"}>
            <Input type="number" ref={inputPageRef} placeholder="Página" variant={"outline"} w={"100px"}/>
            <Button color={"primero.100"} variant={"solid"} onClick={()=>{
              const valor = parseInt(inputPageRef.current.value-1)
              const esMenor = getTotalPages()+1 > inputPageRef.current.value
              const esPositivo = inputPageRef.current.value > 0
              esMenor && esPositivo ? pagination.fns.onSetPage(valor) : null
              inputPageRef.current.value=""
            }}>Ir</Button>
          </Flex>
        </Skeleton>


        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>¿Estás Seguro?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {
                convocatoriaSelect?
                  <Box display={"flex"} flexDir={"column"} gap={"15px"}>
                    <Text>¿Deseas finalizar la convocatoria?</Text> 
                    <Flex flexDir={"row"} gap={"10px"} alignItems={"flex-start"}>
                      <Text fontSize={"16"} fontWeight={"bold"}>Nombre:</Text>
                      <Text fontSize={"16"}>{convocatoriaSelect.nombre}</Text>
                    </Flex>
                    <Flex flexDir={"row"} gap={"10px"} alignItems={"flex-start"}>
                      <Text fontSize={"16"} fontWeight={"bold"}>Fecha Inicio:</Text>
                      <Text fontSize={"16"}>{convocatoriaSelect.fecha_inicio}</Text>
                    </Flex>
                    <Flex flexDir={"row"} gap={"10px"} alignItems={"flex-start"}>
                      <Text fontSize={"16"} fontWeight={"bold"}>Fecha Final:</Text>
                      <Text fontSize={"16"}>{convocatoriaSelect.fecha_fin}</Text>
                    </Flex>
                  </Box>
                  :
                  <Text>No se pudo traer los valores del estudiante</Text>
              }
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No, cancelar
              </Button>
              <Button colorScheme='red' ml={3} onClick={()=>{
                finalizarConvocatoria(convocatoriaSelect.id)
              }}>
                Si, finalizar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </Box>
    </>
  );
};

export default TablaConvocatoria;

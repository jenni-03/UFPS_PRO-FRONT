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
import { FaChevronDown, FaChevronUp, FaSearch, FaChevronLeft, FaChevronRight, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import {AiOutlineEdit, AiOutlineDelete} from "react-icons/ai"
import { MdAdd } from "react-icons/md";
import {AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,Icon, Box, Stack, InputGroup,Tooltip, InputLeftElement, Input, HStack, IconButton, Button, Flex, Skeleton, Text, Switch} from '@chakra-ui/react';

const TablaEstudiantes = ({colsR,wCampo,ancho, showButton=false, showSwitch=true}) => {

  const inputPageRef = useRef(null)
  const {token}= useContext(AppContext)
  const [isLoading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [estudianteSelect, setEstudianteSelect] = useState()
  const [reloadData, setReloadData] = useState(false);
  const [active, setActive] = useState(false)
  const [estudiantes, setEstudiantes] = useState([])
  const cancelRef = useRef()

 const obtenerEstudiantesByEstado = async ( estado ) =>{
    let response = await axiosApi.get(`/api/user/student?estado=${estado}`,{
      headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })
   if(response.status===200){
    setEstudiantes(response.data)
    pagination.fns.onSetPage(0)
    setLoading(false)
   }
  }

const eliminarEstudiante = async (id_estudiante) =>{
    const response = await axiosApi.delete(`/api/user/deleteStudent/${id_estudiante}`,{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch((e)=>{
      toast.error("No se pudo eliminar el estudiante")
    })

    if(response.status===200){
      onClose()
      toast.success("¡Estudiante eliminado correctamente!")
      setReloadData(true);
    }
  }




  useEffect(() => {
  obtenerEstudiantesByEstado(1);
  setReloadData(false); // Resetear el estado después de recargar datos
}, [reloadData]);
 

  
 
  let data
  const nodes = estudiantes

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
      item["codigo"].toLowerCase().includes(search.toLowerCase())
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
      sortFns: {
    CODIGO: (array) => array.sort((a,b) => parseInt(a.codigo)-parseInt(b.codigo)),
    NOMBRE: (array) => array.sort((a,b) => a.nombre.localeCompare(b.nombre)),
    APELLIDO: (array) => array.sort((a, b) => a.apellido.localeCompare(b.apellido)),
    CORREO: (array) => array.sort((a, b) => a.email.localeCompare(b.email)),
  }


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

 const COLUMNS = [
    {
      label: "Código",
      renderCell: (item)=><Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.codigo} >{item.codigo}</Tooltip>,
      sort: {sortKey:"CODIGO"}
    },
    {
      label: "Nombre",
      renderCell: (item)=>item.nombre,
      sort: {sortKey:"NOMBRE"}
    },
    {
      label: "Apellido",
      renderCell: (item)=>item.apellido,
      sort: {sortKey:"APELLIDO"}
    },
    {
      label: "Correo",
      renderCell: (item)=><Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.email} ><Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{item.email}</Text></Tooltip>,
      sort: {sortKey: "CORREO"}
    },
    {
      label: "Estado",
      renderCell: (item)=>item.estado ? "Activo":"Inactivo",
    },
    {
      label: "Editar",
      renderCell: (item)=><Button
        as={Link} to={`/editarEstudiante/${item.id}`}
      >
        <Icon as={AiOutlineEdit}></Icon>
      </Button>,
    },
    {
      label: "Eliminar",
      renderCell: (item)=><Button display={"flex"} justifyContent={"center"} alignItems={"center"} backgroundColor={"segundo.100"} onClick={()=>{
        onOpen()
        setEstudianteSelect(estudiantes.find(e => e.id === item.id))
      }}>
        <Icon color={"primero.100"} as={AiOutlineDelete}/>
      </Button>,
    },
  ]

  return (
    <>
      <Box 
      w={{
            base: "265px",
            sm: "360px",
            md: "500px",
            lg: "750px",
            xl: "1000px",
            '2xl':"1280px",
            "3xl":"1440px",
            "4xl":"1440px",
            "5xl":"1440px"
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
                  active === true ? obtenerEstudiantesByEstado(1) : obtenerEstudiantesByEstado(0)
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
            <Input w={"100%"} placeholder={"Busca por código"} value={search} onChange={handleSearch} />
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
          {/*<Text>{pagination.state.page+1} de {getTotalPages()}</Text>*/}
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
            <AlertDialogHeader>¿Estas Seguro?</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              {
                estudianteSelect ?
                  <Box display={"flex"} flexDir={"column"} gap={"15px"}>
                    <Text>¿Deseas eliminar permanentemente a {estudianteSelect.nombre} {estudianteSelect.apellido}?</Text> 
                    <Text display={"flex"} gap={"10px"}><Text fontSize={"16"} fontWeight={"bold"}>Email:</Text>  {estudianteSelect.email}</Text>
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
                eliminarEstudiante(estudianteSelect.id)
              }}>
                Si, eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </Box>
    </>
  );
};

export default TablaEstudiantes;

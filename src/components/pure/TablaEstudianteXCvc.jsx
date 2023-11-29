import React,{useState, useContext, useEffect} from "react";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-hot-toast";
import { CompactTable } from "@table-library/react-table-library/compact";
import axiosApi from "../../utils/config/axios.config"
import { usePagination } from '@table-library/react-table-library/pagination';
import { useCustom } from '@table-library/react-table-library/table';
import Btn from "../pure/Btn"
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { useSort } from '@table-library/react-table-library/sort';
import { MdAdd } from "react-icons/md";
import { useTheme } from "@table-library/react-table-library/theme";
import { FaChevronDown, FaChevronUp, FaSearch, FaChevronLeft, FaChevronRight, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { PiWarningFill } from "react-icons/pi";
import {AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,Icon, Box,Tooltip, Stack, InputGroup, InputLeftElement, Input, HStack, IconButton, Button, Flex, Skeleton, Text, Switch} from '@chakra-ui/react';
import { AiOutlineDelete } from "react-icons/ai";
import {useParams} from "react-router-dom";
import {useRef} from "react";
const TablaEstudianteXCvc = ({wCampo,ancho, showButton=false, showSwitch=false}) =>{
  const [estudiantes,setEstudiantes] = useState([])
  const [estudianteSelect, setEstudianteSelect] = useState()
  const { token } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false)
  const inputPageRef = useRef(null)
  const [reloadData, setReloadData] = useState(false);
  const {id} = useParams()
  const cancelRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()




  const obtenerEstudiantes = async () =>{
    const response = await axiosApi.get(`/api/convocatoria/${id}/getEstudiantes`,{
      headers:{
        Authorization: "Bearer " + token
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
      setLoading(false)
    })

    console.log(response)
    if(response.status===200){
      setEstudiantes(response.data)
      setLoading(false)
      pagination.fns.onSetPage(0)
      response.data.length===0 && toast("Esta convocatoria no cuenta con estudiantes inscritos", {
        duration: 4000,
        icon:<PiWarningFill size={"40"}/>,
        position: "top-center"
      });
    }
   
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
      setReloadData(true);
    }
  }


  useEffect(()=>{
    obtenerEstudiantes()
    setReloadData(false); 
  },[reloadData])

  let data
  const nodes = estudiantes

  data = { nodes }
  
 

 const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns: ${wCampo};
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
    CORREO: (array) => array.sort((a, b) => a.correo.localeCompare(b.correo)),
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
  
  console.log(estudiantes)
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
    },,
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
      renderCell: (item)=><Tooltip borderRadius={"5px"} bgColor={"primero.100"} placement={"top"} hasArrow label={item.correo} ><Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{item.correo}</Text></Tooltip>,
      sort: {sortKey: "CORREO"}
    },
    {
      label: "Eliminar",
      renderCell: (item)=><Button display={"flex"} justifyContent={"center"}  alignItems={"center"} backgroundColor={"segundo.100"} variant={"unstyled"} onClick={()=>{
        onOpen()
        setEstudianteSelect(estudiantes.find(e => e.id === item.id))
      }}>
        <Icon color={"primero.100"} as={AiOutlineDelete} />
      </Button>,
    }
  ]




  return(
  <>
      <Box 
      w={{
            base: "265px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            xl: "790px",
            '2xl':ancho
          }}
      >
        <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={showButton ? "space-between" : "flex-end"} mb={"20px"}>
        {showButton && (
            <Skeleton isLoaded={!isLoading}>
              <Btn
                leftIcon={<MdAdd/>}
                path={"/"}
                msg={"Agregar Estudiante"}
                w={["100%", "250px"]}
              >
              </Btn>
            </Skeleton>
            )}
            { showSwitch && 
            <Flex align={"center"} gap={"5px"}>
              <Skeleton isLoaded={!isLoading}>
                <Text id="switch" m={"0"}>Mostrar Inactivos</Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Switch id="switch" colorScheme="cyan" onChange={(e) => {
                  setActive(!active)
                  active === true ? obtenerEstudiantesByEstado(1) : obtenerEstudiantesByEstado(0)
                }} />
              </Skeleton>
            </Flex>}
          </Flex>

        <Stack spacing={10}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch style={{ color: '#4a5568' }} />}
            />
            <Input w={"100%"} placeholder={"Busca por código"} value={search} onChange={handleSearch} />
          </InputGroup>
        </Stack>

        <Box   
          mb="15px"
          mt="20px"
          p="20px"
          w={{
            base: "265px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            xl: "100%",
          }}
          borderRadius="8px"
          bgColor="white"
          boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
        >
          <CompactTable  columns={COLUMNS} data={data} sort={sort} theme={theme}  pagination={pagination} layout={{ custom: true, horizontalScroll: true }} />
        </Box>
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
        <Flex width={"100%"} justifyContent={"center"} gap={"15px"}>
          <Input type="number" ref={inputPageRef} placeholder="Página" variant={"outline"} w={"100px"}/>
          <Button color={"primero.100"} variant={"solid"} onClick={()=>{
            const valor = parseInt(inputPageRef.current.value-1)
            const esMenor = getTotalPages()+1 > inputPageRef.current.value
            const esPositivo = inputPageRef.current.value > 0
            esMenor && esPositivo ? pagination.fns.onSetPage(valor) : null
            inputPageRef.current.value=""
          }}>Ir</Button>
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
              No, cancelar
            </Button>
            <Button colorScheme='red' ml={3} onClick={()=>{
                expulsarEstudiante(estudianteSelect.id)
              }}>
              Si, expulsar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </Box>
    </>
   ) 
}

export default TablaEstudianteXCvc

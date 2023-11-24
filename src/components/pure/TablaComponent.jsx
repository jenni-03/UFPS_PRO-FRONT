import React, {useState, useEffect, useRef} from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useSort } from '@table-library/react-table-library/sort';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from "@table-library/react-table-library/theme";
import Btn from "./Btn";
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { FaChevronDown, FaChevronUp, FaSearch, FaChevronLeft, FaChevronRight, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { MdAdd } from "react-icons/md";
import { Box, Stack, InputGroup, InputLeftElement, Input, HStack, IconButton, Button, Flex, Skeleton, Text, Switch} from '@chakra-ui/react';

const TablaComponent = ({showButton=true, buttonPath="/",buttonMsg, inputPlaceHolder, cols, funcionSwitch, sortFns, aBuscar, ancho, ancho2}) => {


  const inputPageRef = useRef(null)
  const [isLoading, setLoading] = useState(false)
  const [active, setActive] = useState(false)
  const [categorias, setCategorias] = useState([])

  let data = {};
  const dataFetch = async (state) =>{
    const nodes = await funcionSwitch(state)
    pagination.fns.onSetPage(0)
    setCategorias(nodes)
  }

  useEffect(()=>{
    dataFetch(1)
  },[])


  const nodes = categorias

  data = { nodes }

  if(isLoading){
    return <div>cARGANDO...</div>
  }



  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  //--data-table-library_grid-template-columns:  200px;
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns: 200px;
      font-family: Open Sans;
    `,
    HeaderRow: `
        .th {
          border-bottom: 5px solid #a0a8ae;
        }
    `,
    
  };
  
  const theme = useTheme([chakraTheme, customTheme]);

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes && data.nodes.filter((item) =>
      item[aBuscar].toLowerCase().includes(search.toLowerCase())
    ),
  };


  // SORT 
  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortFns: sortFns
    },
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  // PAGINATION 

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

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


    const COLUMNS = cols
  return (
    <>
      <Box 
    w={{
            base: "265px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            xl: ancho,
            "2xl":ancho2,
          }}

      >
        {showButton && (
          <Flex align={"center"} flexDir={["column", "column", "row"]} gap={"15px"} justifyContent={"space-between"} mb={"20px"}>
            <Skeleton isLoaded={!isLoading}>
              <Btn
                leftIcon={<MdAdd/>}
                path={buttonPath}
                msg={buttonMsg}
                w={["100%", "250px"]}
              >
              </Btn>
            </Skeleton>
            <Flex align={"center"} gap={"5px"}>
              <Skeleton isLoaded={!isLoading}>
                <Text id="switch" m={"0"}>Mostrar Inactivos</Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Switch id="switch" colorScheme="cyan" onChange={(e) => {
                  setActive(!active)
                  active === true ? dataFetch(1) : dataFetch(0)
                }} />
              </Skeleton>
            </Flex>
          </Flex>
        )}

        <Stack spacing={10}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch style={{ color: '#4a5568' }} />}
            />
            <Input w={"100%"} placeholder={inputPlaceHolder} value={search} onChange={handleSearch} />
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
          <CompactTable columns={COLUMNS} data={data} sort={sort} theme={theme}  pagination={pagination} layout={{ custom: true, horizontalScroll: true }} />
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

      </Box>
    </>
  );
};

export default TablaComponent;

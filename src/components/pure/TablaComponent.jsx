import React from "react";
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
  Switch,
  FormLabel,
} from "@chakra-ui/react";
const TablaComponent = ({tituloColumnas, isButtonEnable,data}) =>{


  return(
    <Box mb="15px" mt="20px" p="20px" borderRadius="8px" bgColor="white">
        <Flex
          w={{
            base: "240px",
            sm: "310px",
            md: "450px",
            lg: "690px",
            tableBreakpoint: "100%",
          }}>
          <Table>
            <Thead>
              <Tr>
              {
                tituloColumnas.map((titulo)=>(
                  <Th>{titulo}</Th>
                ))
              }  
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </Flex>
    </Box>
  )

}

export default TablaComponent

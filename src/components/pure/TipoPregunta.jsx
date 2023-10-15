import React from "react";
import { Card, CardHeader, Heading , CardBody, CardFooter, Text} from "@chakra-ui/react";
import Btn from "./Btn";
export default function TipoPregunta() {
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">Preguntas Disponibles</Heading>
      </CardHeader>
      <CardBody>
        <Text>Seleccione el tipo de pregunta que desea agregar</Text>
      </CardBody>
      <CardFooter w={"100%"} display={"flex"} flexDir={["column","column","row"]} gap={["20px","20px","20px"]} alignItems={"center"} justifyContent={"space-between"} >
        <Btn
          colorScheme={"blue"}
          msg={"Preguntas Simples"}
          path={"/formularioPreguntaSimple"}
          w={"204px"}
        />
        <Btn      
          msg={"Preguntas con Imagen"} 
          path={"/formularioPreguntaImagen"} 
         
           />
      </CardFooter>
    </Card>
  );
}

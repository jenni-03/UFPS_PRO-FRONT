import React from "react";
import { SimpleGrid,Text,  CardHeader, CardBody, Button, Card , Heading, CardFooter} from "@chakra-ui/react";
import { Link } from "react-router-dom";
export default function ConvocatoriaBodyUser(){
  return(
  <SimpleGrid spacing={4} 
    columns={{ base: 1, md: 2, lg: 3 }}

  >
  <Card>
  <CardHeader>
    <Heading size='md'>Convocatoria 1</Heading>
  </CardHeader>
  <CardBody>
    <Text>Esta prueba evalúa tus habilidades en Programación.</Text>
  </CardBody>
  <CardFooter>
    <Button as={Link} to={"/presentarPrueba/1"}>Iniciar Prueba</Button>
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <Heading size='md'>Convocatoria 2</Heading>
  </CardHeader>
  <CardBody>
    <Text>Esta prueba se enfoca en tus conocimientos en Matemáticas.</Text>
  </CardBody>
  <CardFooter>
    <Button as={Link} to={"/presentarPrueba/2"}>Iniciar Prueba</Button>
  </CardFooter>
</Card>
<Card>
  <CardHeader>
    <Heading size='md'>Convocatoria 3</Heading>
  </CardHeader>
  <CardBody>
    <Text>Esta prueba pondrá a prueba tus habilidades de Amdinistración.</Text>
  </CardBody>
  <CardFooter>
    <Button as={Link} to={"/presentarPrueba/3"}>Iniciar Prueba</Button>
  </CardFooter>
</Card>

</SimpleGrid>
  )
}

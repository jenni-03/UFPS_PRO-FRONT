import { Box, Button, Flex, Text, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

export default function ErrorPage({role}) {

    const redirectTo = () => {
    if (role === 'Administrador') {
      return '/home'; // Redirige al panel de administrador
    } else if (role === 'Estudiante') {
      return '/user'; // Redirige al panel de estudiante
    } else {
      return '/'; // Redirige a la página de inicio por defecto
    }
  };

  return (
  <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, primero.100, quinto.100)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Página no encontrada
      </Text>
      <Text color={'gray.500'} mb={6}>
        La pagina que buscas no existe 😭
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, primero.100, quinto.100)"
        color="white"
        as={Link}
        to={redirectTo()}
        variant="solid">
        Regresar
      </Button>
    </Box>
  )
}

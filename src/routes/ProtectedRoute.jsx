import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../components/context/AppProvider";
import { Spinner, Flex} from "@chakra-ui/react";
import jwt_decode from "jwt-decode"

export default function ProtectedRoute({ isValid, children, redirectTo = "/" }) {
  const { user, role, token } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si el rol es válido aquí (puedes usar un efecto si es asíncrono)
    if (token) {
      // Realizar la verificación del rol (por ejemplo, decodificar el token) y establecer isLoading en false cuando esté listo
      const decode = jwt_decode(token);
      const rol = decode.tipo;

      if (rol === "Director" && isValid) {
        setIsLoading(false);
      } else if (rol === "Estudiante" && isValid) {
        setIsLoading(false);
      }
    } else {
      // No hay token, por lo que no se puede verificar el rol
      setIsLoading(false);
    }
  }, [token, isValid]);

  if (isLoading) {
    // Mientras se carga el rol, puedes mostrar un mensaje de carga o lo que desees
    return (<Flex justify={"center"} align={"center"} h="100vh">
      <Spinner size='xl' color="red.500" />
    </Flex>)
  }

  if (token) {
    if (!isValid) {
      return <Navigate to={redirectTo} replace />;
    }
  } else {
    return <Navigate to={"/"} />;
  }

  return children ? children : <Outlet />;
}


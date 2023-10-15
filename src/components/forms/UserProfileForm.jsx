import { React, useState, useContext, useEffect, useRef } from "react";
import {
  Input,
  Flex,
  Box,
} from "@chakra-ui/react";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import Btn from "../pure/Btn";

export default function UserProfileForm() {
  const { token } = useContext(AppContext);
  const [data, setData] = useState({});

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const correoRef = useRef(null);
  const semestreRef = useRef(null);
  const codigoRef = useRef(null);

  useEffect(()=>{
    getUser()
  },[])

  const getUser = async () => {
    const data = await getUsuario();

    setData({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      codigo: data.codigo,
      semestre: data.semestre,
    });
  };

  const getUsuario = async () => {
    let response = await axiosApi.get("/api/user/profile/", {
      headers: { Authorization: "Bearer " + token },
    });
    return response.data;
  };



  return (
    <>
      <Box
        p={"20px"}
        borderRadius={"8px"}
        bgColor={"white"}
        minW={["200px", "350px", "400px", "500px"]}
        maxHeight={"auto"}
        overflow={"hidden"}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          w={"100%"}
          h={"100%"}
          gap={"20px"}
        >
          <Flex 
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Flex flexDir={"column"}>
              <label htmlFor="nombre">Nombres</label>
              <Input
                value={data && data.nombre}
                ref={nombreRef}
                mt={"10px"}
                id="nombre"
                name="nombre"
                type="text"
                w={"100%"}
                disabled
              ></Input>
            </Flex>
            <Flex flexDir={"column"}>
              <label htmlFor="apellido">Apellidos</label>
              <Input
                value={data && data.apellido}
                ref={apellidoRef}
                mt={"10px"}
                id="apellido"
                name="apellido"
                type="text"
                w={"100%"}
                disabled
              ></Input>
            </Flex>
          </Flex>
          <Flex flexDir={"column"}>
            <label htmlFor="correo">Correo Institucional</label>
            <Input
              value={data && data.email}
              ref={correoRef}
              mt={"10px"}
              id="correo"
              name="correo"
              type="text"
              w={"100%"}
              disabled
            ></Input>
          </Flex>

          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="semestre">Semestre</label>
              <Input
                value={data && data.semestre}
                ref={semestreRef}
                mt={"10px"}
                id="semestre"
                name="semestre"
                type="text"
                w={"100%"}
                disabled
              ></Input>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="codigo">Código</label>
              <Input
                value={data && data.codigo}
                ref={codigoRef}
                mt={"10px"}
                id="codigo"
                name="codigo"
                type="text"
                w={"100%"}
                disabled
              ></Input>
            </Box>
          </Flex>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Btn
              w={["100%", "100%","217px"]}
              path={"/editarInformacionEstudiante"}
              msg={"Editar Información"}
            />
            <Btn
              w={["100%","100%","217px"]}
              path={"/cambiarContraseniaEstudiante"}
              msg={"Cambiar Contraseña"}
            />
          </Flex>
        </Box>
      </Box>
    </>
  );
}

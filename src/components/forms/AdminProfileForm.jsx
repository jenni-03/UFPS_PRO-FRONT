import {React, useState, useContext, useEffect, useRef} from "react";
import { Input, Flex, Box, Button, Image, Icon, useEditable } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import Boton from "../pure/Boton";
import axiosApi from "../../utils/config/axios.config";
import { getAdministratorById } from "../../services/user/axios.service";
import { AppContext } from "../context/AppProvider";
import Btn from "../pure/Btn";

export default function AdminProfileForm() {

  //const {token, setToken, imagen} = useContext(AppContext)
  const {token} = useContext(AppContext)
  const [data, setData] = useState({})

  const nombreRef = useRef(null);
  const apellidoRef = useRef(null);
  const direccionRef = useRef(null);
  const correoRef = useRef(null);
  const documentoRef = useRef(null);
  const celularRef = useRef(null);
  const telefonoRef = useRef(null);
  const codigoRef = useRef(null);

  useEffect(()=>{
    getAdmin()
  },[])


  const getAdmin = async () =>{
    const data = await getAdministrator()
    setData({
      nombre:data.nombre,
      apellido:data.apellido,
      direccion:data.direccion,
      email: data.email,
      documento: data.documento,
      celular: data.celular,
      telefono: data.telefono,
      codigo: data.codigo,
      imagen:data.foto_perfil && data.foto_perfil.url
    })


  }


  const getAdministrator = async () =>{
      
    let response = await axiosApi.get("/api/user/profile",{
      headers:{ Authorization:"Bearer " + token }
    })

    return response.data
  }

  return (
    <>
      <Box
        p={"20px"}
        borderRadius={"8px"}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
        bgColor={"white"}
        minW={["200px", "350px", "400px", "500px"]}
        maxHeight={"auto"}
        overflow={"hidden"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          w={"100%"}
          h={"100%"}
          gap={"20px"}
          action=""
        >
          <Box
            display="flex"
            dir="row"
            position={"relative"}
            justifyContent={"center"}
            w={"100%"}
          >
            <Image
              src={data && data.imagen}
              key={data && data.imagen}
              width={["70px", "100px", "130px"]}
              height={["70px", "100px", "130px"]}
              borderRadius={"50%"}
              objectFit={"cover"}
              objectPosition={"center"}
            />
            <Button
              position={"absolute"}
              minW={["21px", "27px", "30px"]}
              padding={"0"}
              height={["21px", "27px", "30px"]}
              top={["50px", "73px", "100px"]}
              left={["125px", "180px", "210px", "260px"]}
              borderRadius={"50%"}
              backgroundColor={"segundo.100"}
              as={Link}
              to="/cambiarImagen"
              _hover={"none"}
              _active={"none"}
            >
              <Icon color="#1a202c" as={RiEdit2Fill} />
            </Button>
          </Box>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="nombre">Nombre</label>
              <Input
                value={data && data.nombre}
                ref={nombreRef}
                mt={"10px"}
                id="nombre"
                name="nombre"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="apellido">Apellido</label>
              <Input
                value={data && data.apellido}
                ref={apellidoRef}
                mt={"10px"}
                id="apellido"
                name="apellido"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Flex>
          <Flex flexDir={"column"}>
            <label htmlFor="direccion">Dirección</label>
            <Input
              value={data && data.direccion}
              ref={direccionRef}
              mt={"10px"}
              id="direccion"
              name="direccion"
              type="text"
              w={"100%"}
              disabled
            ></Input>
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
              <label htmlFor="documento">Número de Documento</label>
              <Input
                value={data && data.documento}
                ref={documentoRef}
                mt={"10px"}
                id="documento"
                name="documento"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="celular">Celular</label>
              <Input
                value={data && data.celular}
                ref={celularRef}
                mt={"10px"}
                id="celular"
                name="celular"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
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
            <Box display={"flex"} flexDirection={"column"}>
              <label htmlFor="telefono">Teléfono</label>
              <Input
                value={data && data.telefono}
                ref={telefonoRef}
                mt={"10px"}
                id="telefono"
                name="telefono"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
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
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Flex>
          <Flex
            flexDirection={["column", "column", "row", "row", "row"]}
            w={"100%"}
            gap={["8px", "8px", "0"]}
            justifyContent={"space-between"}
          >

            <Btn
              w={["100%", "100%", "160px", "185px", "200px"]}
              path="/editarInformacion"
              textColor={"quinto.100"}
              msg={"Editar Información"}

            />
            
             <Btn
              w={["100%", "100%", "160px", "185px", "200px"]}
              path="/cambiarContrasenia"
              textColor={"quinto.100"}
              msg={"Cambiar Contraseña"}

            />


          </Flex>
        </Box>
      </Box>
    </>
  );
}

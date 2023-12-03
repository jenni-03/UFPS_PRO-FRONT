import {React, useState, useContext, useEffect, useRef} from "react";
import { Input, Flex, Box, Button, Image, Icon, FormLabel, Skeleton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import Boton from "../pure/Boton";
import axiosApi from "../../utils/config/axios.config";
import { getAdministratorById } from "../../services/user/axios.service";
import { AppContext } from "../context/AppProvider";
import Btn from "../pure/Btn";

export default function AdminProfileForm() {

  const {token} = useContext(AppContext)
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)

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
    setLoading(false)

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
            <Skeleton borderRadius={"50%"} isLoaded={!isLoading}>
            <Image
              src={data && data.imagen ? data.imagen : "https://res.cloudinary.com/dojljgscf/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1700790025/ufps_pro/perfil_vyserv.jpg?_s=public-apps"}
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
            </Skeleton>
          </Box>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
            <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel htmlFor="nombre">Nombre</FormLabel>
              <Input
                value={data && data.nombre}
                ref={nombreRef}
                id="nombre"
                name="nombre"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            </Skeleton>
            <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel htmlFor="apellido">Apellido</FormLabel>
              <Input
                value={data && data.apellido}
                ref={apellidoRef}
                id="apellido"
                name="apellido"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
            </Skeleton>
          </Flex>
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
          <Flex flexDir={"column"}>
            <FormLabel htmlFor="direccion">Dirección</FormLabel>
            <Input
              value={data && data.direccion}
              ref={direccionRef}
              id="direccion"
              name="direccion"
              type="text"
              w={"100%"}
              disabled
            ></Input>
          </Flex>
          </Skeleton>
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
          <Flex flexDir={"column"}>
            <FormLabel htmlFor="correo">Correo Institucional</FormLabel>
            <Input
              value={data && data.email}
              ref={correoRef}
              id="correo"
              name="correo"
              type="text"
              w={"100%"}
              disabled
            ></Input>
          </Flex>
          </Skeleton>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel htmlFor="documento">Número de Documento</FormLabel>
              <Input
                value={data && data.documento}
                ref={documentoRef}
                id="documento"
                name="documento"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Skeleton>
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel htmlFor="celular">Celular</FormLabel>
              <Input
                value={data && data.celular}
                ref={celularRef}
                id="celular"
                name="celular"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Skeleton>
          </Flex>
          <Flex
            gap={["20px", "20px"]}
            direction={["column", "column", "row", "row", "row"]}
            w={"100%"}
            justifyContent={"space-between"}
          >
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel htmlFor="telefono">Teléfono</FormLabel>
              <Input
                value={data && data.telefono}
                ref={telefonoRef}
                id="telefono"
                name="telefono"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Skeleton>
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Box display={"flex"} flexDirection={"column"}>
              <FormLabel htmlFor="codigo">Código</FormLabel>
              <Input
                value={data && data.codigo}
                ref={codigoRef}
                id="codigo"
                name="codigo"
                type="text"
                w={["100%", "100%", "160px", "185px", "200px"]}
                disabled
              ></Input>
            </Box>
          </Skeleton>
          </Flex>
          <Flex
            flexDirection={["column", "column", "row", "row", "row"]}
            w={"100%"}
            gap={["8px", "8px", "0"]}
            justifyContent={"space-between"}
          >
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
            <Btn
              w={["100%", "100%", "160px", "185px", "200px"]}
              path="/editarInformacion"
              textColor={"quinto.100"}
              msg={"Editar Información"}

            />
          </Skeleton>
          <Skeleton borderRadius={"10px"} isLoaded={!isLoading}>
             <Btn
              w={["100%", "100%", "160px", "185px", "200px"]}
              path="/cambiarContrasenia"
              textColor={"quinto.100"}
              msg={"Cambiar Contraseña"}

            />
          </Skeleton>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

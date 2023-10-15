import {React, useEffect, useState, useContext} from "react";
import {
  Input,
  Flex,
  Box,
  Button,
  Image,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Boton from "../pure/Boton";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate} from "react-router-dom";
import Btn from "../pure/Btn";
export default function EditarInformacionAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({})
  const navigate = useNavigate()
  const {token, setToken} = useContext(AppContext)


    useEffect(()=>{
    getAdmin()
  },[])

  {/*const getAdministratorById = async (id) =>{

    let response = await axiosApi.get(`/api/user/admin/${id}`,{
        headers:{ Authorization:"Bearer " + token},
    })
    return response.data
    
}*/}

  const getAdministrator = async () =>{
      
    let response = await axiosApi.get("/api/user/profile",{
      headers:{ Authorization:"Bearer " + token }
    })

    return response.data
  }

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
      //imagen:data.foto_perfil && data.foto_perfil.url
    })

    setIsLoading(false)

  }
 

const actualizarDatos = async (nombre, apellido, direccion, documento, celular, telefono, codigo, estado=true) =>{

    let response = await axiosApi.put(`api/user/admin/update`,{
        nombre:nombre,
        apellido:apellido,
        direccion: direccion,
        documento: documento,
        celular: celular,
        telefono: telefono,
        codigo: codigo,
        estado: estado
    },{
       headers: {
            "Content-Type": "application/json",
            Authorization:"Bearer " + token
        },
      }

    ).catch((e)=>{
      toast.error(e.error.data.error)
    })

    if(response.status === 200){
      toast.success("¡Datos Actualizados!")
      navigate("/home")
    }
}




{/*const getAdminById = async (id) =>{
     const data = await getAdministratorById(id)
     
     setData({
        nombre:data.nombre,
        apellido:data.apellido,
        direccion:data.direccion,
        email: data.email,
        documento: data.documento,
        celular: data.celular,
        telefono: data.telefono,
        codigo: data.codigo
     })
     
     setIsLoading(false)
  }
  */}
  const initialValues = 
 {
      nombre: data.nombre,
      apellido: data.apellido,
      direccion: data.direccion,
      email: data.email,
      documento: data.documento,
      celular: data.celular,
      telefono: data.telefono,
      codigo: data.codigo,
    }
  
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo requerido").max(25,"Maximo 25 dígitos").min(5,"Mínimo 5 digitos").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ]+( [a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$","El nombre únicamente debe tene letras"),
    apellido: Yup.string().required("Campo requerido").max(35,"Maximo 35 dígitos").min(5,"Mínimo 5 digitos").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ]+( [a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$","El apellido únicamente debe tene letras"),
    direccion: Yup.string().required("Campo requerido").max(60,"Maximo 60 caracteres").min(20,"Mínimo 20 caracteres")
    .matches("^(?! )[-a-zA-ZÀ-ÖØ-öø-ÿ0-9#.,]+( [-a-zA-ZÀ-ÖØ-öø-ÿ0-9#.,]+)*(?<! )$","s"),
    email: Yup.string().email("email inválido").required("Campo requerido"),
    documento: Yup.string().required("Campo requerido").max(10,"Maximo 10 dígitos").min(7,"Mínimo 7 digitos").matches("^[0-9]+$","El documento solo debe contener numeros"),
    celular: Yup.string().required("Campo requerido").max(10,"Maximo 10 dígitos").min(10,"Mínimo 10 digitos").matches("^[0-9]+$","El celular solo debe contener números"),
    telefono: Yup.string().required("Campo requerido").max(7,"Maximo 7 dígitos").min(7,"Mínimo 7 digitos").matches("^[0-9]+$","El teléfono solo debe contener números"),
    codigo: Yup.string().required("Campo requerido").max(7,"Maximo 7 dígitos").min(7,"Mínimo 7 digitos").matches("^[0-9]+$","El código solo puede contener numeros"),
  });


   if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={( {nombre, apellido, direccion, documento, celular, telefono, codigo } ) => {
          actualizarDatos(nombre, apellido, direccion, documento, celular, telefono, codigo)
        }}
      >
        {(values) => {
          const { errors,isSubmitting, touched } = values;
          return (
            <Form>
              <Box
                p={"20px"}
                borderRadius={"8px"}
                bgColor={"white"}
                w={["200px", "350px", "450px", "550px"]}
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
                  action=""
                >
                  <Flex
                    gap={"20px"}
                    direction={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    justifyContent={"space-between"}
                  >
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.nombre && touched.nombre}>
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Field
                          
                          as={Input}
                          mt={"10px"}
                          id="nombre"
                          name="nombre"
                          type="text"
                          
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                    
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.apellido && touched.apellido}>
                      <FormLabel  htmlFor="apellido">Apellido</FormLabel>
                      <Field
                         
                        as={Input}
                        mt={"10px"}
                        id="apellido"
                        name="apellido"
                        type="text"
                        
                      />
                      <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                      </FormControl>
                    
                  </Flex>
                  
                    <FormControl display={"flex"} flexDir={"column"} isInvalid={errors.direccion && touched.direccion}>
                    <FormLabel htmlFor="direccion">Dirección</FormLabel>
                    <Field
                        
                      as={Input}
                      mt={"10px"}
                      id="direccion"
                      name="direccion"
                      type="text"
                      w={"100%"}
                    />
                    <FormErrorMessage>{errors.direccion}</FormErrorMessage>
                    </FormControl>
                  
                  
                    <FormControl display={"flex"} flexDir={"column"} isInvalid={errors.email && touched.email} >
                    <FormLabel htmlFor="email">Email Institucional</FormLabel>
                    <Field
                      
                      as={Input}
                      mt={"10px"}
                      id="email"
                      name="email"
                      type="text"
                      w={"100%"}
                      disabled
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>

                  <Flex
                    gap={["20px", "20px"]}
                    direction={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    justifyContent={"space-between"}
                  >
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.documento && touched.documento}>
                      <FormLabel htmlFor="documento">Número de Documento</FormLabel>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="documento"
                        name="documento"
                        type="text"
                        
                      />
                      <FormErrorMessage>{errors.documento}</FormErrorMessage>
                      </FormControl>
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.celular && touched.celular}>
                      <FormLabel htmlFor="celular">Celular</FormLabel>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="celular"
                        name="celular"
                        type="text"
                        
                      />
                      <FormErrorMessage>{errors.celular}</FormErrorMessage>
                      </FormControl>
                   
                  </Flex>
                  <Flex
                    gap={["20px", "20px"]}
                    direction={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    justifyContent={"space-between"}
                  >
                   
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.telefono && touched.telefono}>
                      <FormLabel htmlFor="telefono">Teléfono</FormLabel>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="telefono"
                        name="telefono"
                        type="text"
                        

                      />
                      <FormErrorMessage>{errors.telefono}</FormErrorMessage>
                      </FormControl>
                  
                    
                      <FormControl display={"flex"} flexDirection={"column"} isInvalid={errors.codigo && touched.codigo}>
                      <FormLabel htmlFor="codigo">Código</FormLabel>
                      <Field
                        
                        as={Input}
                        mt={"10px"}
                        id="codigo"
                        name="codigo"
                        type="text"
                        
                      />
                      <FormErrorMessage>{errors.codigo}</FormErrorMessage> 
                      </FormControl>
                    
                  </Flex>
                  <Flex
                    flexDirection={["column", "column", "row", "row", "row"]}
                    w={"100%"}
                    gap={["8px", "8px", "0"]}
                    justifyContent={"center"}
                  >
                    <Btn
                      isSubmit={true}
                      w={"100%"} 
                      msg={"Enviar"}
                    >

                    </Btn>
                  </Flex>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
      
    </>
  );
}

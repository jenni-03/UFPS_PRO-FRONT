import { Box, Center, Input, Textarea,Flex, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import {React, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup"
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast } from "react-hot-toast";
import Btn from "../pure/Btn";
export default function FormAgregarEstudiante() {


  const {id} = useParams()
  const {token} = useContext(AppContext)
  const navigate = useNavigate()
  const AgregarEstudiante = async (nombre,apellido,codigo,email,semestre) =>{
    let body={
      nombre:nombre,
      apellido:apellido,
      email:email,
      codigo:codigo.toString(),
      semestre:semestre
    }
  
    let response = await axiosApi.post(`/api/convocatoria/${id}/registroEstudiante`,body,{
      headers:{
        "Content-Type": "application/json",
        Authorization:"Bearer " + token
      }
    }).catch((e)=>{
      throw new Error(e.response.data.error)
    })

    if(response.status === 200){
      toast.success("¡Estudiante agregado a la convocatoria!")
      navigate(`/convocatoria/${id}/estudiantes`)
    }

  }

  const initialValues = {
    nombre: "",
    apellido: "",
    codigo: "",
    email: "",
    semestre: "",
  }

  const validationSchema= Yup.object().shape(
    {
      nombre: Yup.string().required("El nombre es requerido").min(2,"Mínimo 2 caracteres").max(50,"Máximo 50 caracteres").matches("^(?! )[-a-zA-ZÀ-ÖØ-öø-ÿ]+( [-a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$","El nombre solamente debe contener letras"),
      apellido: Yup.string().required("El apellido es requerido").min(2,"Mínimo 2 caracteres").max(55,"Máximo 55 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ.,\r\n0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ,.\r\n0-9]+)*(?<! )$","La descripción solamente debe contener letras"),
      codigo: Yup.number().required("El código es requerido"),
      email: Yup.string().required("El correo es requerido").matches("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$","Formato inválido"), 
      semestre: Yup.string().required("El semestre es requerido").max(2,"Máximo dos digitos")
    }
  )

  return (
    <Box position="fixed" p={"20px"}>
      <Center h="100%">
        <Box
          p="20px"
          borderRadius="8px"
          bgColor="white"
          minW={["150px", "250px", "480px", "550px"]}
          overflow="hidden"
          boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({nombre,apellido,codigo, email, semestre}) => {
              //AgregarEstudiante(nombre, apellido,codigo,email,semestre)
              toast.promise(AgregarEstudiante(nombre, apellido,codigo,email,semestre), {
                loading: 'Añadiendo al estudiante...',
                success: 'Estudiante añadido exitosamente',
                error: (e)=>e+"",
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection="column"
                >
                  <Flex flexDir={["column","row","row","row"]} gap={"25px"} width={"100%"} mb={"15px"}>
                    <Box display="flex" flexDirection="column" justifyContent="center" w={"100%"}>
                      <FormLabel htmlFor="nombre">Nombre</FormLabel>
                      <FormControl isInvalid={errors.nombre && touched.nombre}>
                        <Field
                          as={Input}
                          id="nombre"
                          name="nombre"
                          type="text"
                          w={"100%"}
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      w={"100%"}
                    >
                      <FormLabel htmlFor="apellido">Apellido</FormLabel>
                      <FormControl isInvalid={errors.apellido && touched.apellido}>
                        <Field
                          as={Input}
                          id="apellido"
                          name="apellido"
                          w={"100%"}
                        />
                        <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                      </FormControl>
                    </Box>
                  </Flex>
                  <Flex  flexDir={["column","row","row","row"]} gap={"25px"} width={"100%"} mb={"10px"}>
                    <Box display="flex" flexDirection="column" justifyContent="center" w={"100%"}>
                      <FormLabel htmlFor="nombre">Semestre</FormLabel>
                      <FormControl isInvalid={errors.semestre && touched.semestre}>
                        <Field
                          as={Input}
                          id="semestre"
                          name="semestre"
                          type="number"
                          w={"100%"}
                        />
                        <FormErrorMessage>{errors.semestre}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      width={"100%"}
                    >
                      <FormLabel htmlFor="apellido">Código</FormLabel>
                      <FormControl isInvalid={errors.codigo && touched.codigo}>
                        <Field
                          as={Input}
                          id="codigo"
                          type={"number"}
                          name="codigo"
                          w={"100%"}
                        />
                        <FormErrorMessage>{errors.codigo}</FormErrorMessage>
                      </FormControl>
                    </Box>
                  </Flex>
                  <Box
                    display="flex"
                    flexDirection="column"
                    w={"100%"}
                    justifyContent="center"
                  >
                    <FormLabel htmlFor="apellido">Correo</FormLabel>
                    <FormControl isInvalid={errors.email && touched.email}>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        w={"100%"}
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Btn
                    isSubmit={true}
                    mt={"15px"}
                    width={"100%"}
                    msg={"Guardar"}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Center>

    </Box>
  );
}


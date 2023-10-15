import { Box, Button, Center, Input, Textarea, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import {React, useContext} from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../pure/Boton";
import * as Yup from "yup"
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { toast, Toaster } from "react-hot-toast";
import Btn from "../pure/Btn";
export default function FormularioCompetencia() {


  const {token,user} = useContext(AppContext)
  const navigate = useNavigate()
  const AgregarCompetencia = async (nombre, descripcion) =>{
    let body={
      nombre:nombre,
      descripcion:descripcion
    }
    let response = await axiosApi.post("api/competencia/create",body,{
      headers:{
        "Content-Type": "application/json",
        Authorization:"Bearer " + token
      }
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status === 200){
      toast.success("¡Competencia Creada!")
      navigate("/competencias")
    }

  }

  const initialValues = {
    nombre: "",
    descripcion: "",
  }

  const validationSchema= Yup.object().shape(
    {
      nombre: Yup.string().required("El nombre es requerido").min(5,"Minimo 5 caracteres").max(25,"Maximo 25 caracteres").matches("^(?! )[-a-zA-ZÀ-ÖØ-öø-ÿ]+( [-a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$","El nombre solamente debe contener letras"),
      descripcion: Yup.string().required("La descripción es requerida").min(10,"Minimo 10 caracteres").max(200,"Máximo 200 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ.,\r\n0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ,.\r\n0-9]+)*(?<! )$","La descripción solamente debe contener letras")
    }
  )

  return (
    <Box position="fixed">
      <Center h="100%">
        <Box
          p="40px"
          borderRadius="8px"
          bgColor="white"
          minW={["150px", "250px", "480px", "550px"]}
          overflow="hidden"
          boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({nombre, descripcion}) => {
              let desc = descripcion.replace(/\n+/g,"\n")
              AgregarCompetencia(nombre, desc)
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                >
                  <Box display="flex" flexDirection="column" justifyContent="center">
                    <label htmlFor="nombre">Nombre</label>
                    <FormControl isInvalid={errors.nombre && touched.nombre}>
                      <Field
                        as={Input}
                        mt="10px"
                        id="nombre"
                        name="nombre"
                        type="text"
                        maxW={["200px", "300px", "350px", "400px"]}
                        w="400px"
                      />
                      <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box
                    mt="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <label htmlFor="descripcion">Descripción</label>
                    <FormControl isInvalid={errors.descripcion && touched.descripcion}>
                      <Field
                        as={Textarea}
                        mt="10px"
                        id="descripcion"
                        name="descripcion"
                        resize="none"
                        h="180px"
                        maxW={["200px", "300px", "350px", "400px"]}
                        w="400px"
                      />
                      <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                    </FormControl>
                  </Box>
                 <Btn
                    isSubmit={true}
                    mt={"30px"}
                    w={["200px", "300px", "350px", "400px"]}
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


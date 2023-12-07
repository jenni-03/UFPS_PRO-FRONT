
import { Box, Center, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosApi from "../../utils/config/axios.config";
import {  toast} from "react-hot-toast";
import { AppContext } from "../context/AppProvider";
import Btn from "../pure/Btn";

export default function FormularioCategoria() {
  const { token } = useContext(AppContext);
  const [competencia, setCompetencia] = useState([]);
  const navigate = useNavigate()

  const obtenerCompetencias = async () => {
    let response = await axiosApi.get("/api/competencia", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).catch((e) => {
      toast.error("Fallo al traer los las competencias");
    });

  

    setCompetencia(response.data);
  };


  const agregarCategoria = async (nombre, descripcion, id) =>{
    let body={
      nombre:nombre,
      descripcion:descripcion,
      competencia_id:id
    }

    let response = await axiosApi.post("/api/categoria/create",body,{
      headers: {
        Authorization: "Bearer " + token,
      },
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status===200){
      toast.success("¡Categoría agregada correctamente!")
      navigate("/categorias")
    }

  }

  useEffect(() => {
    obtenerCompetencias();
  }, []);

  const elementosActivos = competencia.filter(item => item.estado === true);


  const initialValues = {
    nombre: "",
    descripcion: "",
    competencia: "",
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido").min(2,"Mínimo 2 caracteres").max(70,"Máximo 70 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ]+( [a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$","El nombre solamente debe contener letras"),
    descripcion: Yup.string().required("La descripción es requerida").min(5,"Mínimo 5 caracteres").max(240,"Máximo 240 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ.,\r\n0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ,.\r\n0-9]+)*(?<! )$","La descripción solamente debe contener letras"),
    competencia: Yup.string().required("La competencia es requerida"),
  });


  return (
    <Box position="fixed"
          boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
    >

      <Center h="100%">
        <Box
          p="20px"
          borderRadius="8px"
          bgColor="white"
          overflow="hidden"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({nombre, descripcion,competencia})=>{
              let desc = descripcion.replace(/\n+/g,"\n")
              agregarCategoria(nombre,desc,parseInt(competencia))
            }}
          >
            {(formik) => (
              <Form>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                
              >
                <FormControl
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  isInvalid={formik.errors.nombre && formik.touched.nombre}
                >
                  <FormLabel htmlFor="nombre">Nombre</FormLabel>
                  <Field
                  as={Input}
                    id="nombre"
                    name="nombre"
                    type="text"
                    maxW={["200px", "300px", "350px", "400px"]}

                  />
                  <FormErrorMessage>{formik.errors.nombre}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt="10px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  isInvalid={formik.errors.descripcion && formik.touched.descripcion}
                >
                  <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                  <Field
                    as={Textarea}
                    id="descripcion"
              name="descripcion"
                    resize="vertical"
                    h="100px"
                    maxW={["200px", "300px", "350px", "400px"]}
                  />
                  <FormErrorMessage>{formik.errors.descripcion}</FormErrorMessage>
                </FormControl>
                <FormControl
                  mt="10px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  w={["200px", "300px", "350px", "400px"]}
                  isInvalid={formik.errors.competencia && formik.touched.competencia}
                >
                  <FormLabel htmlFor="competencia">Competencia</FormLabel>
                  <Field
                  as={Select}
                    id="competencia"
                    name="competencia"
                    maxW={["200px", "300px", "350px", "400px"]}
                    w="100%"
                    border="2px solid gray"
                  >
                    <option value="">Selecciona una competencia</option>
                    {elementosActivos.map((competencia) => (
                      <option key={competencia.id} value={competencia.id}>
                        {competencia.nombre}
                      </option>
                    ))}
                  </Field>
                  <FormErrorMessage>{formik.errors.competencia}</FormErrorMessage>
                </FormControl>
                <Btn
                  isSubmit={true}
                  w={["200px", "300px", "350px", "400px"]}
                  mt={"20px"}
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

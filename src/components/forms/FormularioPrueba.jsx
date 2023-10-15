import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import axiosApi from "../../utils/config/axios.config"
import {  toast, Toaster } from "react-hot-toast";
import { AppContext } from '../context/AppProvider';
import { useNavigate } from 'react-router-dom';
import Btn from "../pure/Btn"
import {
  Box,
  FormControl,
  Button,
  FormErrorMessage,
  Input,
  MenuOptionGroup,
  Menu,
  Select,
  MenuButton,
  MenuList,
  MenuItem,
  FormLabel,
  Stack,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

const initialValues = {
  nombre: '',
  descripcion: '',
  semestre: '',
  duracion: '',
  competencias: [],
  totalPreguntas: "",
  //categorias: [],
};

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido").max(55, "Máximo 55 caracteres").min(10, "Mínimo 10 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*(?<! )$", "El nombre solamente debe contener letras y números"),
  descripcion: Yup.string().required("La descripcion es requerida").max(200, "Máximo 200 caracteres").min(30, "Mínimo 30 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*(?<! )$", "El descripcion solamente debe contener letras y números"),
  semestre: Yup.string().required('El semestre es obligatorio').max(2,"Máximo dos caracteres").matches("[0-9]","El semestre solo puede contener números"),
  duracion: Yup.number().required('La duración es obligatoria'),
  totalPreguntas: Yup.number().required("El total de preguntas de la prueba es obligatorio"),
  competencias: Yup.array().required('Selecciona al menos una competencia'),
  //categorias:Yup.array().of(
   //     Yup.array().of(
    //        Yup.number().required('Este campo es obligatorio')
     //   )
    //), 

});




const FormularioPrueba = () => {
  const navigate = useNavigate()
  const { token } = useContext(AppContext);
  const [competencias, setCompetencias] = useState([]);
  const [categoriasObtenidas, setCategoriasObtenidas] = useState([])

  //Solicitamso las competencias
  useEffect(() => {
    axiosApi.get('/api/competencia', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        setCompetencias(response.data);
      })
      .catch((error) => {
      });
  }, []);

  //Solicitamos las categorias
  useEffect(()=>{
    axiosApi.get('/api/categoria',{
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((response) => {
      setCategoriasObtenidas(response.data);
    })
      .catch((error) => {
      });
  },[])


  const crearPrueba = async (values) =>{
    const arregloCategorias = []
    const arregloCategoriasID = []
    const arregloPreguntasPorCategorias = []

    const {categorias,descripcion,duracion,nombre, semestre,totalPreguntas} = values

    try{
    values && values.competencias.forEach((competenciaId) => {
      const competencia = competencias.find((c) => c.id === competenciaId);
      if (competencia) {
        // Agrega el valor de `categoria.nombre` a `categoriaId`
        values.categorias[competencia.id].forEach((categoria, index) => {
          const categoriaObj = competencia.categorias[index];
          if (categoriaObj) {
            const categoriaFinal = categoriasObtenidas.find((c) => c.nombre === categoriaObj.nombre)
            categoria.categoriaId= categoriaFinal.id;
          }
        });
      }
    });
    }
    catch(e){
    }

    try{
    values.categorias.map((categoria, index)=>{
      if(categoria){
        const arreglo = []
        categoria.map((c,index)=>{
          const objeto = {} 
          objeto.categoria_id = c.categoriaId
          objeto.preguntas= c.numPreguntas
          objeto.valor= c.porcentaje
          arreglo.push(objeto)
          arregloCategoriasID.push(c.categoriaId)
          arregloPreguntasPorCategorias.push(c.numPreguntas)
        })   
        arregloCategorias.push(arreglo)
      }
    })
    }catch(e){

    }

    const body = {
      nombre: nombre,
      descripcion: descripcion,
      semestre: semestre.toString(),
      duracion: duracion,
      total_preguntas: totalPreguntas,
      competencias: values.competencias,
      valorCategorias: arregloCategorias,
      categorias: arregloCategoriasID,
      preguntas: arregloPreguntasPorCategorias,
    }
    const response = await axiosApi.post("/api/prueba/create",body,{
      headers: {
        Authorization: "Bearer " + token,
      },
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status===200){
      toast.success("¡Prueba creada correctamente!")
      navigate("/pruebas")
    }

  }

  return (
    <Box
      bgColor={"white"}

      boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
      w={{
        base: "270px",
        sm: "390px",
        md: "540px",
        lg: "640px",
        tableBreakpoint: "800px",
      }}
      p={"40px"}
      borderRadius={"8px"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          crearPrueba(values)
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Flex gap={"20px"} flexDir={["column", "column", "row"]}>
              <FormControl 
                display={"flex"} 
                flexDir={"column"} 
                gap={"10px"}
                isInvalid={errors.nombre  && touched.nombre}>
                <FormLabel htmlFor="nombre">Nombre</FormLabel>
                <Field
                  w={"100%"}
                  as={Input} 
                  type="text" 
                  id="nombre" 
                  name="nombre" 
                />
                <FormErrorMessage>{errors.nombre}</FormErrorMessage>
              </FormControl>

              <FormControl 
                isInvalid={errors.descripcion && touched.descripcion}
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
              >
                <FormLabel 
                  htmlFor="descripcion"
                >Descripción:</FormLabel>
                <Field 
                  as={Input}
                  w={"100%"}
                  type="text" 
                  id="descripcion" 
                  name="descripcion" />
                <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex
              mt={"20px"}
              gap={"20px"}
              flexDir={["column", "column", "row"]}
            >
              <FormControl 
                isInvalid={errors.semestre && touched.semestre}
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
              >
                <FormLabel 
                  htmlFor="semestre">Semestre:</FormLabel>
                <Field 
                  as={Input}
                  type="number" 
                  id="semestre" 
                  name="semestre"
                  w={"100%"}
                />
                <FormErrorMessage>{errors.semestre}</FormErrorMessage>
              </FormControl>

              <FormControl 
                isInvalid={errors.duracion && touched.duracion}
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
              >
                <FormLabel htmlFor="duracion">Duración (minutos):</FormLabel>
                <Field 
                  as={Input}
                  w={"100%"}
                  type="number" id="duracion" name="duracion" />
                <FormErrorMessage>{errors.duracion}</FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl 
              isInvalid={errors.totalPreguntas && touched.totalPreguntas}
              display={"flex"}
              flexDir={"column"}
              gap={"10px"}
              m={"20px 0 20px 0"}

            >

              <FormLabel htmlFor="preguntas">Total Preguntas</FormLabel>
              <Field 
                as={Input}
                w={"100%"}
                type="number" id="totalPreguntas" name="totalPreguntas" />
              <FormErrorMessage>{errors.totalPreguntas}</FormErrorMessage>
            </FormControl>

            <FormLabel>Competencias:</FormLabel>
            {competencias
                .filter((competencia) => competencia.categorias.length > 0) // Filtrar competencias con categorías
                .map((competencia) => (
                  <Box key={competencia.id} m={"10px 0 10px 0"}>
                    <Box display={"flex"} alignItems={"center"}>
                      <Field
                        as={Checkbox}
                        name="competencias"
                        colorScheme="cyan"
                        mr={"15px"}
                        value={competencia.id}
                        checked={values.competencias.includes(competencia.id)}
                        onChange={(e) => {
                          const selectedId = competencia.id;
                          const selected = values.competencias.includes(selectedId);
                          if (selected) {
                            // Desseleccionar si ya estaba seleccionado
                            const updatedCompetencias = values.competencias.filter(
                              (id) => id !== selectedId
                            );
                            handleChange({
                              target: { name: 'competencias', value: updatedCompetencias },
                            });
                          } else {
                            // Seleccionar si no estaba seleccionado
                            handleChange({
                              target: {
                                name: 'competencias',
                                value: [...values.competencias, selectedId],
                              },
                            });
                          }
                        }}
                      />
                      <Box fontWeight={"semibold"} fontStyle={"italic"}>
                        {competencia.nombre}
                      </Box>
                    </Box>
                    <FormErrorMessage>{errors.competencias}</FormErrorMessage>
                    {values.competencias.includes(competencia.id) && (
                      <FieldArray name="categorias">
                        {(arrayHelpers) =>
                            competencia.categorias.map((categoria, index) => (
                              <Box
                                w={"90%"}
                                display={"flex"}
                                flexDir={"column"}
                                ml={"30px"}
                                gap={"10px"}
                                key={categoria.nombre}
                              >
                                <Box mt={"10px"}>{categoria.nombre}</Box>
                                <Box
                                  w={"100%"}
                                  display={"flex"}
                                  flexDir={"row"}
                                  gap={"15px"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                >
                                  <Field
                                    as={Input}
                                    type="number"
                                    name={`categorias.${competencia.id}.${index}.numPreguntas`}
                                    placeholder="Número de preguntas"
                                  />
                                  <Field
                                    as={Input}
                                    type="number"
                                    name={`categorias.${competencia.id}.${index}.porcentaje`}
                                    placeholder="Porcentaje"
                                  />
                                  <Field
                                    display={"none"}
                                    as={Input}
                                    type="text"
                                    id={`categorias.${competencia.id}.${index}.categoriaNombre`}
                                    name={`categorias.${competencia.id}.${index}.categoriaNombre`}
                                    placeholder="Nombre"
                                  />
                                </Box>
                              </Box>
                            ))
                        }
                      </FieldArray>
                    )}
                  </Box>
                ))
            }
            <Btn
              isSubmit={true}
              msg={"Guardar"}
              w={"100%"}

            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormularioPrueba;


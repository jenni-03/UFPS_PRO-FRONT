import {
  Box,
  Button,
  Select,
  Center,
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  Image
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { React, useContext, useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import * as Yup from "yup";
import Boton from "../pure/Boton";
import { toast } from "react-hot-toast";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import { BiObjectsVerticalCenter } from "react-icons/bi";
import axios from "axios";
import Btn from "../pure/Btn";

export default function FormEditarPregunta() {
  const {id} = useParams()
  const { token } = useContext(AppContext);
  const [imagen, setImagen] = useState()
  const [initialValues, setInitialValues] = useState();
  const [categorias, setCategorias] = useState();
  const navigate = useNavigate()
  const inputRef = useRef()

  const cambiarImagen = () =>{
    const file = inputRef.current && inputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagen(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const obtenerCategorias = async () => {
    let response = await axiosApi
      .get("api/categoria/?estado=1", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });
    setCategorias(response.data);
  };


  useEffect(()=>{
    cambiarImagen() 
  },[imagen])

  const actualizarPregunta = async (id,imagen,texto_pregunta,arregloOpciones,semestre,respuesta,categoria_id,estado) =>{
    const formData = new FormData();
    formData.append("imagen", imagen);
    formData.append("texto_pregunta", texto_pregunta);
    formData.append("semestre", semestre);
    formData.append("opciones", JSON.stringify(arregloOpciones));
    formData.append("respuesta", respuesta);
    formData.append("estado", estado)
    formData.append("categoria_id", categoria_id);


    let response = await axiosApi.put(`/api/question/update/${id}`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    }).catch((e) => {
      toast.error(e.response.data.error);
    })

    if(response.status === 200){
      toast.success("¡Pregunta actualizada correctamente!")
      navigate("/preguntas")
    }
  }

  const obtenerPreguntaPorId = async (id) => {
    let response = await axiosApi
      .get(`/api/question/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });


    const categoriaEncontrada = categorias && categorias.find(
      (categoria) => categoria.nombre === response.data.categoria
    );

    setInitialValues({
      enunciado: response.data.enunciado,
      semestre: response.data.semestre,
      estado: response.data.estado.toString() === "true" ? "1" : "0",
      categoria: categoriaEncontrada ? categoriaEncontrada.id : null,
      imagen:"",
      opciones:response.data.opciones,
      respuesta: response.data.respuesta,
    });
    setImagen(response.data.imageFile)
  };

  const validationSchema = Yup.object().shape({
    enunciado: Yup.string().required("El enunciado es requerido"),
    semestre: Yup.string().required("El semestre es requerido"),
    estado: Yup.string().required("El estado es requerido"),
    categoria: Yup.string().nullable(),
    imagen: Yup.string().nullable(),
    opciones: Yup.array(),
    respuesta: Yup.string()
    .required("La respuesta es requerida")
    .matches(/^[A-Z]$/, "La respuesta debe ser una letra entre A, B, C o D"),

  });

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      obtenerPreguntaPorId(id);
    }
  }, [categorias]);

  if (!initialValues) {
    return <div>Cargando...</div>;
  }

  return (
    <Box>
      <Center h="100%">
        <Box
          p="40px"
          borderRadius="8px"
          bgColor="white"
          minW={["150px", "250px", "480px", "550px"]}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
          overflow="hidden"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={({enunciado, semestre,respuesta,estado,categoria, opciones})=>{
              actualizarPregunta(id,inputRef.current.files[0],enunciado,opciones,semestre,respuesta,categoria,estado)
            }}
          >
            {(props) => {
              const { errors, touched, setFieldValue } = props;
              return (
                <Form>

                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <FormLabel htmlFor="enunciado">Enunciado</FormLabel>
                    <FormControl
                      isInvalid={touched.enunciado && errors.enunciado}
                    >
                      <Field
                        as={Textarea}
                        mt="10px"
                        id="enunciado"
                        name="enunciado"
                        resize={"none"}
                      />
                      <FormErrorMessage>{errors.enunciado}</FormErrorMessage>
                    </FormControl>
                    <Box mt={"15px"}>
                      <FormLabel>Imagen</FormLabel>
                      <Image src={imagen ? imagen : null }
                        m={"0 auto"}
                        h={"auto"}
                        w={"400px"}
                        objectFit={"cover"}
                        objectPosition={"center"}
                      />
                      {!imagen && <Box>Esta pregunta no cuenta con imagen</Box>}
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection={["column","column","row"]}
                    mt={"15px"}
                    width={"100%"}
                    alignItems={"center"}
                    gap={"20px"}
                  >
                    <Box w={"100%"}>
                      <FormLabel>Añadir Imagen</FormLabel>
                      <Field
                        id="imagen"
                        name="imagen"
                        mt="10px"
                        mr={{ base: "0", sm: "5" }}
                        mb={{ base: "2", sm: "0" }}
                      >
                        {({ field }) => (
                          <FormControl
                            isInvalid={touched.imagen && errors.imagen}
                          >
                            <Input
                              type="file"
                              accept=".png, .jpeg"
                              name="imagen"
                              h={"40px"}
                              ref={inputRef}
                              borderRadius={"0px"}
                              variant="unstyled"
                              onChange={(event) => {
                                cambiarImagen();
                              }}
                              {...field}
                            />
                            <FormErrorMessage>{errors.imagen}</FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>

                    <Box w={"100%"}>
                      <FormLabel htmlFor="semestre">Semestre</FormLabel>
                      <FormControl
                        isInvalid={touched.semestre && errors.semestre}
                      >
                        <Field
                          as={Input}
                          id="semestre"
                          name="semestre"
                        />
                        <FormErrorMessage>{errors.semestre}</FormErrorMessage>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    mt="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    w="100%"
                  >
                    <FormLabel htmlFor="categoria">Categoría</FormLabel>
                    <FormControl
                      isInvalid={touched.categoria && errors.categoria}
                    >
                      <Field
                        as={Select}
                        id="categoria"
                        name="categoria"
                        border="2px solid gray"
                        mt="10px"
                      >
                        {categorias && categorias.map((categoria, index) => (
                          <option key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.categoria}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box
                    mt="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    w="100%"
                  >
                    <FormLabel htmlFor="estado">Estado</FormLabel>
                    <FormControl
                      isInvalid={touched.estado && errors.estado}
                    >
                      <Field
                        as={Select}
                        id="estado"
                        name="estado"
                        border="2px solid gray"
                        mt="10px"
                      >
                        <option value={"1"}>Activo</option>
                        <option value={"0"}>Inactivo</option>
                      </Field>
                      <FormErrorMessage>{errors.estado}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box
                    mt="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                  </Box>
                  <Box
                    mt="10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >

                    <Box display="grid" gridTemplateColumns={`repeat(2, 1fr)`} gridGap="20px">
                      {initialValues.opciones.map((opcion, index) => (
                        <FormControl
                          key={index}
                          isInvalid={errors.opciones && errors.opciones[index]}
                        >
                          <FormLabel htmlFor={`opcion-${index}`}>Opción {String.fromCharCode(65 + index)}</FormLabel>
                          <Field
                            id={`opcion-${index}`}
                            name={`opciones[${index}]`}
                            as={Textarea}
                            resize={"none"}
                          />
                          <FormErrorMessage>{errors.opciones && errors.opciones[index]}</FormErrorMessage>
                        </FormControl>
                      ))}

                    </Box>


                    <FormControl
                      isInvalid={errors.respuesta && touched.respuesta}
                      mt={"15px"}
                    >
                      <FormLabel htmlFor="respuesta">Respuesta</FormLabel>
                      <Field id="respuesta" name="respuesta" as={Input} />
                      <FormErrorMessage>{errors.respuesta}</FormErrorMessage>
                    </FormControl>

                  </Box>
                  <Box display="flex" justifyContent="center">
                    <Btn
                      isSubmit={true}
                      mt={"15px"}
                      w={"100%"}
                      msg={"Guardar"}
                    />
                  </Box>
                </Form>  
              );
            }}
          </Formik>
        </Box>
      </Center>
    </Box>
  );
}

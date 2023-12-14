import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Select,
  Center,
  Input,
  Flex,
  FormControl,
  FormErrorMessage,
  Skeleton,
  FormLabel,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast } from "react-hot-toast";
import Btn from "../pure/Btn";

export default function FormEditarEstudiante() {
  const { id } = useParams();
  const { token } = useContext(AppContext);
  const [datos, setDatos] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const actualizarEstudiante = async (
    nombre,
    apellido,
    codigo,
    email,
    semestre,
    estado,
    id
  ) => {
    let body = {
      nombre: nombre,
      apellido: apellido,
      codigo: codigo,
      email: email,
      semestre: semestre,
      estado: estado,
    };

    let response = await axiosApi
      .put(`api/user/student/update/${id}`, body, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    if (response.status === 200) {
      toast.success("¡Estudiante actualizado!");
      navigate("/estudiantes");
    }
  };

  const getEstudianteById = async (id) => {
    let response = await axiosApi
      .get(`/api/user/student/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .catch((e) => {
        toast.error(e.response.data.error);
      });

    setDatos({
      nombre: response.data.nombre,
      apellido: response.data.apellido,
      codigo: response.data.codigo,
      email: response.data.email,
      semestre: response.data.semestre,
      estado: response.data.estado.toString(),
    });
    setLoading(false);
  };

  useEffect(() => {
    getEstudianteById(id);
  }, []);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .max(50, "Máximo 50 caracteres")
      .min(2, "Mínimo 2 caracteres")
      .matches(
      "^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ]+( [a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$",
      "El nombre únicamente debe tene letras"
      ),
    apellido: Yup.string()
      .required("El apellido es requerido")
      .max(55, "Máximo 55 caracteres")
      .min(2, "Mínimo 2 caracteres")
      .matches(
       "^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ]+( [a-zA-ZÀ-ÖØ-öø-ÿ]+)*(?<! )$",
      "El Apellido únicamente debe tene letras"
      ),
    semestre: Yup.string()
      .required("El semestre es requerido")
      .max(2, "Máximo 2 dígitos")
      .min(1, "Mínimo 1 dígido"),
    email: Yup.string().email().required("El email es requerido"),
    estado: Yup.string().required("El estado es requerido"),
    codigo: Yup.string()
      .required("El código es requerido")
      .max(7, "Máximo 7 caracteres")
      .min(7, "Mínimo 7 caracteres")
      .matches("^[0-9]+$", "El código solo puede contener numeros")
    ,
  });

  if (loading) {
    return (
      <Box
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
    >
      <Center h="100%">
        <Box
          p="20px"
          borderRadius="8px"
          bgColor="white"
          w={["240px", "290px", "350px", "480px"]}
          overflow="hidden"
        >
          <Flex gap={"20px"} flexDir={"column"}>
          <Flex gap={"10px"} flexDir={["column", "column", "row"]}>
            <Skeleton w={"100%"} borderRadius={"10px"} h={"70px"} isLoaded={!loading}></Skeleton>
            <Skeleton w={"100%"} borderRadius={"10px"} h={"70px"} isLoaded={!loading}></Skeleton>
          </Flex>
          <Flex  gap={"10px"} flexDir={["column", "column", "row"]}>
            <Skeleton w={"100%"} borderRadius={"10px"} h={"70px"} isLoaded={!loading}></Skeleton>
            <Skeleton w={"100%"} borderRadius={"10px"} h={"70px"} isLoaded={!loading}></Skeleton>
          </Flex>
            <Skeleton  w={"100%"} borderRadius={"10px"} h={"60px"} isLoaded={!loading}></Skeleton>
            <Skeleton w={"100%"} borderRadius={"10px"} h={"40px"} isLoaded={!loading}></Skeleton>
          </Flex>
        </Box>
        </Center>
        </Box>

    );
  }

  return (
    <Box>
      <Center h="100%">
        <Box p="20px" borderRadius="8px" bgColor="white" overflow="hidden" >
          <Formik
            initialValues={datos}
            validationSchema={validationSchema}
            onSubmit={(
              { nombre, apellido, codigo, email, semestre, estado },
              { setFieldValue }
            ) => {
              const estadoValue = estado === "true";
              actualizarEstudiante(
                nombre,
                apellido,
                codigo,
                email,
                semestre,
                estadoValue,
                id
              );
            }}
          >
            {(props) => {
              const { errors, touched } = props;
              return (
                <Form>
                  <Box gap={"20px"} display={"flex"} flexDir={"column"}>
                    <Box
                      display={"flex"}
                      flexDir={["column", "column", "row"]}
                      w={"100%"}
                      justifyContent={"space-between"}
                      gap={"15px"}
                    >
                      <FormControl
                        display="flex"
                        flexDirection="column"
                        isInvalid={errors.nombre && touched.nombre}
                      >
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Field
                          name="nombre"
                          as={Input}
                          id="nombre"
                          type="text"
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        display="flex"
                        flexDirection="column"
                        isInvalid={errors.apellido && touched.apellido}
                      >
                        <FormLabel htmlFor="apellido">Apellido</FormLabel>
                        <Field
                          name="apellido"
                          as={Input}
                          id="apellido"
                          type="text"
                        />
                        <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      display={"flex"}
                      flexDir={["column", "column", "row"]}
                      justifyContent={"center"}
                      gap={"15px"}
                    >
                      <FormControl
                        display="flex"
                        flexDirection="column"
                        isInvalid={errors.estado && touched.estado}
                      >
                        <FormLabel htmlFor="estado">Estado</FormLabel>
                        <Field
                          name="estado"
                          as={Select}
                          id="estado"
                          type="text"
                        >
                          <option value={"true"}>Activo</option>
                          <option value={"false"}>Inactivo</option>
                        </Field>
                        <FormErrorMessage>{errors.estado}</FormErrorMessage>
                      </FormControl>
                      <FormControl
                        display="flex"
                        flexDirection="column"
                        isInvalid={errors.codigo && touched.codigo}
                      >
                        <FormLabel htmlFor="codigo">Código</FormLabel>
                        <Field
                          name="codigo"
                          as={Input}
                          id="codigo"
                          type="text"
                        />
                        <FormErrorMessage>{errors.codigo}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <FormControl
                      display="flex"
                      flexDirection="column"
                      isInvalid={errors.email && touched.email}
                    >
                      <FormLabel htmlFor="email">Correo</FormLabel>
                      <Field
                        name="email"
                        as={Input}
                        id="email"
                        type="text"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                    <Btn isSubmit={true} msg={"Guardar"} w={"full"} />
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

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useInterval,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form, setIn } from "formik";
import CardLogo from "../../components/pure/CardLogo";
import {React, useContext, useEffect, useState} from "react";
import { AppContext } from "../../components/context/AppProvider";
import { login } from "../../services/user/axios.service";
import { Link, useNavigate} from "react-router-dom"
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode"

export default function Login() {
  const initialValues = {
    email: "",
    password: "",
  };



  const { setToken, setRole,role,token,user, setUser, setIsInPrueba} = useContext(AppContext)

  const navigate = useNavigate()

  const redireccion = (rol) =>{
    if(rol==="Director"){
      navigate("/home")
    }else if(rol==="Estudiante"){
      navigate("/user")
    }else{
      navigate("/")
    }

  } 

  useEffect(()=>{
    redireccion(role)
  },[user])



  const ingresar = async (email, password) =>{
    const data = await login(email,password)
    sessionStorage.setItem("token",data.accessToken)
    sessionStorage.setItem("isInPrueba",false)
    setIsInPrueba(sessionStorage.getItem("isInPrueba"))
    setToken(sessionStorage.getItem("token"))
    const decoded = jwt_decode(sessionStorage.getItem("token"))
    setUser(data)
    setRole(decoded.tipo)
    redireccion(decoded.tipo)
  } 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Correo Inválido").required("Correo requerido"),
    password: Yup.string()
    .required("Contraseña requerida")
    .min(5, "La contraseña es muy corta")
    .max(20, "La contraseña es muy larga"),
  });


  return (
    <CardLogo wd={"380px"} p={"20px"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={({email, password}) => {
          ingresar(email, password)
        }}
      >
        {(props) => {
          const { values, errors, isSubmitting, touched } = props;

          return (
            <Form>
              <FormControl isInvalid={errors.email && touched.email}>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  variant="filled"
                  borderColor="gray.300"
                  type="email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password && touched.password}>
                <FormLabel htmlFor="password" mt={4}>
                  Contraseña
                </FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  autocomplete={"on"}
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Box mt={4} textAlign="center" color={"blue.400"} textDecoration={"underline"}>

                <Link to="/recuperarEmail"  _hover="none">Olvidé mi contraseña</Link>
              </Box>
              <Button
                color="white"
                background={"primero.100"}
                mt={4}
                width="full"
                type="submit"
                _hover={{
                  backgroundColor:"#2E3140"
                }}
              >
                Ingresar
              </Button>
            </Form>
          );
        }}
      </Formik>
    </CardLogo>
  );
}

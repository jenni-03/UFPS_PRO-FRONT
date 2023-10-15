import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Toast,
} from "@chakra-ui/react";
import axiosApi from "../../utils/config/axios.config";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { Toaster, toast} from "react-hot-toast";
import {React, useContext }from "react";
import { AppContext } from "../context/AppProvider";
import Boton from "../pure/Boton";
import Btn from "../pure/Btn";

export default function FormularioPasswordEstudiante() {

  const {token,user} = useContext(AppContext)
  const navigate= useNavigate()
  const cambiarContraseña = async (password, newPassword) =>{
    let body = {
        email:user.username,
        password,
        newPassword
    }
    let response = await axiosApi.put("api/user/updatePassword",body,{
       headers: {
            "Content-Type": "application/json",
            Authorization:"Bearer " + token
        },
    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status === 200){
      toast.success(`¡${response.data.message}!`)
      navigate("/user")
    }
    "" 
  }

  const initialValues = {
    passwordActual: "",
    password: "",
    passwordR: "",
  };



  const validationSchema = Yup.object().shape({
    passwordActual: Yup.string().required("Contraseña actual requerida"),
    password: Yup.string()
      .required("Contraseña requerida")
      .min(10, "La contraseña es muy corta")
      .max(65, "La contraseña es muy larga"),
    passwordR: Yup.string()
      .required("Contraseña requerida")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });

  return (
    <Box
      bg="white"
      borderRadius="md"
      p={6}
      pt={8}
      width={{ base: "100%", sm: "380px" }}
      height="auto"
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({passwordR, passwordActual}) => {
          cambiarContraseña(passwordActual, passwordR)

        }}
      >
        {(props) => {
          const { errors, touched } = props;

          return (
            <Form>
              <FormControl
                isInvalid={errors.passwordActual && touched.passwordActual}
              >
                <FormLabel htmlFor="passwordActual" mt={4}>
                  Contraseña Actual
                </FormLabel>
                <Field
                  as={Input}
                  id="passwordActual"
                  name="passwordActual"
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.passwordActual}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password && touched.password}>
                <FormLabel htmlFor="password" mt={4}>
                  Contraseña Nueva
                </FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.passwordR && touched.passwordR}>
                <FormLabel htmlFor="passwordR" mt={4}>
                  Repetir Contraseña
                </FormLabel>
                <Field
                  as={Input}
                  id="passwordR"
                  name="passwordR"
                  borderColor="gray.300"
                  variant="filled"
                  type="password"
                />
                <FormErrorMessage>{errors.passwordR}</FormErrorMessage>
              </FormControl>
                            <Btn
                color="white"
                background="principal.100"
                mt={4}
                w="full"
                isSubmit={true}
                msg={"Aceptar"}
              >

              </Btn>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

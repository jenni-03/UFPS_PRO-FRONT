import React, { useState , useContext, useEffect} from 'react'
import { AppContext } from "../context/AppProvider";
import { Box, FormLabel, FormErrorMessage, FormControl, Button, Input, Select, useSafeLayoutEffect } from '@chakra-ui/react';
import * as Yup from "yup"
import moment from 'moment';
import {Formik, Form, Field} from "formik"
import Btn from "../../components/pure/Btn"
import axiosApi from '../../utils/config/axios.config';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
export default function FormEditarConvocatoria() {
  const {id} = useParams()
  const [datos, setDatos] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [pruebas, setPruebas] = useState()
  const { token } = useContext(AppContext);
  const initialValues = {
    nombre:"",
    prueba_id:"",
    descripcion:"",
    fecha_inicio:"",
    fecha_fin:""
  }

   const obtenerPruebas = async () =>{
    let response = await axiosApi.get(`/api/prueba`,{
        headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error(e.response.data.error)
     })
     setPruebas(response.data)
  } 

  useEffect(()=>{
    obtenerPruebas()
    getConvocatoriaById(id)
  },[]) 

  const actualizarConvocatoria = async (nombre, prueba_id, descripcion, fecha_inicio, fecha_fin, id) =>{
    let body={
        nombre:nombre,
        prueba_id:prueba_id,
        descripcion:descripcion,
        fecha_inicio:fecha_inicio,
        fecha_fin:fecha_fin
    }


    let response = await axiosApi.put(`api/convocatoria/update/${id}`,body,{
         headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error(e.response.data.error)
    })

    if(response.status === 200){
        toast.success("¡La convocatoria se actualizó correctamente!")
        navigate("/convocatorias")
    }

  }

  const getConvocatoriaById = async (id) =>{
    let response = await axiosApi.get(`/api/convocatoria/${id}`,{
         headers:{
        Authorization:"Bearer " + token,
      }
    }).catch((e)=>{
        toast.error("Error al traer las convocatorias")
    })
     const convocatoria = response.data;
    setDatos({
      nombre: convocatoria.nombre ? convocatoria.nombre : null,
      prueba_id: convocatoria.prueba.id ? convocatoria.prueba.id : null,
      descripcion: convocatoria.descripcion ? convocatoria.descripcion : "assa",
      fecha_inicio: convocatoria.fecha_inicio? moment(convocatoria.fecha_inicio).local().format("YYYY-MM-DDTHH:mm"): null,
      fecha_fin: convocatoria.fecha_fin? moment(convocatoria.fecha_fin).local().format("YYYY-MM-DDTHH:mm"): null,
    })
    setLoading(false)
  }

 

  const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  fecha_inicio: Yup.string().required("La fecha inicial es requerida"),
  fecha_fin: Yup.string().required("La fecha final es requerida"),
  prueba_id: Yup.string().required("La prueba es requerida")
});

if(loading){
    return <div>Cargando...</div>
}
  return (
        <Box
          p="20px"
          borderRadius="8px"
          bgColor="white"
          overflow="hidden"
          maxW={["200px","300px","530px"]}
          minW={"200px"}
          boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}

        >
          <Formik
            initialValues={datos}
            validationSchema={validationSchema}
            onSubmit={({ nombre,prueba_id, fecha_inicio, fecha_fin,descripcion, email, semestre, estado }, { setFieldValue }) => {
              const fechaInicio = moment(fecha_inicio).format("YYYY-MM-DD HH:mm")
              const fechaFinal = moment(fecha_fin).format("YYYY-MM-DD HH:mm")
              actualizarConvocatoria(nombre, prueba_id.toString(), descripcion, fechaInicio, fechaFinal,id)
            }}
          >
            {(props) => {
              const { errors, touched } = props;
              return (
                <Form>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    gap={"20px"}
                    w={"100%"}
                  >
                    <Box
                        display={"flex"}
                        flexDir={["column","column","row"]}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"15px"}
                        w={"100%"}
                    >
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.nombre && touched.nombre}>
                        <FormLabel htmlFor="nombre">Nombre</FormLabel>
                        <Field
                          name="nombre"
                          as={Input}
                          id="nombre"
                          type="text"
                        />
                        <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                      </FormControl>
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.prueba_id && touched.prueba_id}>
                        <FormLabel htmlFor="prueba_id">Prueba</FormLabel>
                        <Field
                          name="prueba_id"
                          as={Select}
                          id="prueba_id"
                          type="text"
                        >
                        {pruebas &&
                          pruebas.map((prueba, index) => (
                            <option key={prueba.id} value={prueba.id}>
                              {prueba.nombre}
                            </option>
                          ))}
                        </Field>
                        
                        <FormErrorMessage>{errors.prueba_id}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                      display={"flex"}
                        flexDir={["column","column","row"]}
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={"15px"}
                        w={["100%","100%","48.5%"]}
                    >
                      
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.fecha_inicio && touched.fecha_inicio}>

                        <FormLabel htmlFor="fecha_inicio">Fecha Inicial</FormLabel>
                        <Field
                          name="fecha_inicio"
                          as={Input}
                          id="fecha_inicio"
                          type="datetime-local"
                        />
                        <FormErrorMessage>{errors.fecha_inicio}</FormErrorMessage>
                      </FormControl>
                      <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.fecha_fin && touched.fecha_fin}>
                        <FormLabel htmlFor="fecha_fin">Fecha final</FormLabel>
                        <Field
                          name="fecha_fin"
                          as={Input}
                          id="fecha_fin"
                          type="datetime-local"
                        />
                        <FormErrorMessage>{errors.fecha_fin}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box
                        w={"100%"}
                    >
                         <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.descripcion && touched.descripcion}>
                        <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
                        <Field
                          name="descripcion"
                          as={Input}
                          id="descripcion"
                          type="text"
                        />
                        <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Btn
                      isSubmit={true}
                      msg={"Guardar"}
                        w={"100%"}

                    >
                      
                    </Btn>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
  )
        }

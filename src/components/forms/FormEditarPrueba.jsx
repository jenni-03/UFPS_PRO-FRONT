import React,{useEffect, useState, useContext}from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Box,Flex, FormControl,FormLabel,Input,FormErrorMessage,Select} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../utils/config/axios.config";
import { AppContext } from "../context/AppProvider";
import Btn from "../pure/Btn";

export default function FormEditarPrueba(){
  const { token } = useContext(AppContext);
  const navigate = useNavigate()
  const {id} = useParams()
  const [isLoading, setLoading] = useState(true)
  const [datos, setDatos] = useState({})

  const obtenerPruebaPorId = async (id) =>{
    const response = await axiosApi.get(`/api/prueba/${id}`,{
      headers: {
        Authorization: "Bearer " + token
      }
    }).catch((e) => {
      toast.error("Error al traer los datos de la Prueba");
    });
   
    const nuevoArreglo = response.data.configuracion_categoria.map(item => [item.categoria_id,item.valor_categoria]);
    setDatos({
      nombre: response.data.nombre,
      descripcion: response.data.descripcion,
      duracion: response.data.duracion,
      valoresCategorias: response.data.configuracion_categoria,
      estado: response.data.estado.toString(),
      nuevo:nuevoArreglo,
      puntajeTotal:response.data.puntaje_total,
    })
    setLoading(false);
  }

  useEffect(()=>{
    obtenerPruebaPorId(id)
  },[])

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido").max(55, "Máximo 55 caracteres").min(10, "Mínimo 10 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*(?<! )$", "El nombre solamente debe contener letras y números"),
    descripcion: Yup.string().required("La descripcion es requerida").max(200, "Máximo 200 caracteres").min(30, "Mínimo 30 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*(?<! )$", "El descripcion solamente debe contener letras y números"),
    duracion: Yup.number().required('La duración es obligatoria'),
    estado: Yup.string().required("El estado es requerido"),
    puntajeTotal: Yup.number().required('El puntaje total es obligatorio'),
    valoresCategorias:  Yup.array(),
    nuevo:Yup.array().of(
        Yup.array().of(
            Yup.number().required('Este campo es obligatorio')
        )
    ), 
  });



  const actualizarPrueba = async (values) =>{

    const {nuevo, nombre, descripcion,duracion,estado,puntajeTotal} = values
    
    const body={
      nombre:nombre,
      descripcion:descripcion,
      duracion:duracion,
      estado: estado==="true",
      puntaje_total:puntajeTotal,
      valoresCategorias:nuevo
    }
    const response = await axiosApi.put(`/api/prueba/update/${id}`,body,{
      headers: {
        Authorization: "Bearer " + token
      }

    }).catch((e)=>{
      toast.error(e.response.data.error)
    })

    if(response.status===200){
      toast.success("¡Prueba editada con exito!")
      navigate("/pruebas")
    }
    
  }


  if(isLoading){
    return <div>Cargando..</div>
  }

  return(
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
        initialValues={datos}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          actualizarPrueba(values)
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Flex gap={"20px"} mb={"15px"} flexDir={["column", "column", "row"]}>
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
            <FormControl 
              isInvalid={errors.duracion && touched.duracion}
              display={"flex"}
              flexDir={"column"}
              mb={"15px"}
              gap={"10px"}
            >
              <FormLabel 
                htmlFor="duracion"
              >Duración (minutos)</FormLabel>
              <Field 
                as={Input}
                w={"100%"}
                type="number" 
                id="duracion" 
                name="duracion" />
              <FormErrorMessage>{errors.duracion}</FormErrorMessage>
            </FormControl>
            <Flex gap={"20px"} mb={"15px"} flexDir={["column", "column", "row"]}>
              <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.estado && touched.estado}>
                <FormLabel htmlFor="estado">Estado</FormLabel> 
                <Field
                  name="estado"
                  as={Select}
                  mt="10px"
                  id="estado"
                  type="text"
                  maxW={["200px", "300px", "350px", "400px"]}
                  w="100%"
                >
                  <option value={"true"}>Activo</option>
                  <option value={"false"}>Inactivo</option>
                </Field>
                <FormErrorMessage>{errors.estado}</FormErrorMessage>
              </FormControl>
              <FormControl 
                isInvalid={errors.puntajeTotal && touched.puntajeTotal}
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
              >
                <FormLabel 
                  htmlFor="descripcion"
                >Puntaje Total</FormLabel>
                <Field 
                  as={Input}
                  w={"100%"}
                  type="number" 
                  id="puntajeTotal" 
                  name="puntajeTotal" />
                <FormErrorMessage>{errors.puntajeTotal}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex flexDir={"column"} gap={"15px"}>
            <FieldArray name={"nuevo"}>
            {

              (arrayHelpers)=>(
                datos && datos.valoresCategorias.map((categoria,index)=>(
                  <Box>
                    <FormLabel>{categoria.categoria.nombre}</FormLabel> 

                    <Field
                      as={Input}
                      type="number"
                      //value={categoria.categoria_id}
                      name={`nuevo.${index}.1`}
                      placeholder="Valor de las preguntas"
                    />
                    {errors.nuevo ? 
                      <Box mt={"10px"} color={"#e83c3c"}>{errors.nuevo[index]}</Box>
                      :null}
                    </Box> 
                ))
              )
            }
              </FieldArray>
            </Flex>
              <Btn
                mt={"15px"}
                isSubmit={true}
                msg={"Guardar"}
                w={"100%"}
            />
          </Form>)}
      </Formik>
    </Box>

  ) 


}

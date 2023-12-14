import React,{useEffect, useState, useContext}from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Box,Skeleton,Flex, FormControl,FormLabel,Input,FormErrorMessage,Select,Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,} from "@chakra-ui/react";
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


    const nuevoArreglo = response.data.Configuraciones_categorias.map(item => [item.categoria_id,item.valor_categoria,item.cantidad_preguntas]);
    setDatos({
      nombre: response.data.nombre,
      descripcion: response.data.descripcion,
      duracion: response.data.duracion,
      valoresCategorias: response.data.Configuraciones_categorias,
      totalPreguntas:response.data.total_preguntas,
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
    nombre: Yup.string().required("El nombre es requerido").max(70, "Máximo 70 caracteres").min(10, "Mínimo 10 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*(?<! )$", "El nombre solamente debe contener letras y números"),
    descripcion: Yup.string().required("La descripcion es requerida").max(200, "Máximo 200 caracteres").min(20, "Mínimo 20 caracteres").matches("^(?! )[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+( [a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*(?<! )$", "El descripcion solamente debe contener letras y números"),
    duracion: Yup.string().required('La duración es obligatoria').matches(/^\d+$/,"Solo números positivos"),
    estado: Yup.string().required("El estado es requerido"),
    puntajeTotal: Yup.string().required('El puntaje total es obligatorio').matches(/^\d+$/,"Solo números positivos"),
    valoresCategorias:  Yup.array(),
    nuevo:Yup.array().of(
      Yup.array().of(
        Yup.number().required('Este campo es obligatorio')
      )
    ), 
  });



  const actualizarPrueba = async (values) =>{

    const {nuevo, nombre, descripcion,duracion,estado,puntajeTotal,totalPreguntas} = values

    const body={
      nombre:nombre,
      descripcion:descripcion,
      duracion:duracion,
      estado: estado==="true",
      total_preguntas:totalPreguntas,
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
    return (
      <Box
        bgColor={"white"}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"}
        w={{
          base: "270px",
          sm: "390px",
          md: "540px",
          lg: "640px",
        }}
        padding={"20px"}
        borderRadius={"8px"}
      >
        <Flex m={"0 0 20px 0"} flexDir={["column","column","row"]} gap={"20px"}>
          <Skeleton w={"100%"} borderRadius={"10px"} h={"80px"} isLoaded={!isLoading}></Skeleton>
          <Skeleton w={"100%"} borderRadius={"10px"} h={"80px"} isLoaded={!isLoading}></Skeleton>
        </Flex>
        <Flex m={"0 0 20px 0"} flexDir={["column","column","row"]} gap={"20px"}>
          <Skeleton w={"100%"} borderRadius={"10px"} h={"80px"} isLoaded={!isLoading}></Skeleton>
          <Skeleton w={"100%"} borderRadius={"10px"} h={"80px"} isLoaded={!isLoading}></Skeleton>
        </Flex>
        <Flex m={"0 0 20px 0"} flexDir={["column","row","row"]} gap={"20px"}>
          <Skeleton w={"100%"} borderRadius={"10px"} h={"80px"} isLoaded={!isLoading}></Skeleton>
          <Skeleton w={"100%"} borderRadius={"10px"} h={"80px"} isLoaded={!isLoading}></Skeleton>
        </Flex>
        <Skeleton w={"100%"} borderRadius={"10px"} h={"70px"} isLoaded={!isLoading}></Skeleton>
        <Skeleton m={"20px 0 0 0"} w={"100%"} borderRadius={"10px"} h={"40px"} isLoaded={!isLoading}></Skeleton>
      </Box>  
    ) 
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
      }}
      p={"20px"}
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
            <Flex gap={"20px"} mb={"10px"} flexDir={["column", "column", "row"]}>
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
                  min="0"
                  id="duracion" 
                  name="duracion" />
                <FormErrorMessage>{errors.duracion}</FormErrorMessage>
              </FormControl> 
            </Flex>
            <Flex mb={"10px"} gap={"20px"} flexDir={["column", "column:", "row"]}>
              <FormControl 
                isInvalid={errors.totalPreguntas && touched.totalPreguntas}
                display={"flex"}
                flexDir={"column"}
                gap={"10px"}
              >
                <FormLabel 
                  htmlFor="totalPreguntas"
                >Total Preguntas</FormLabel>
                <Field 
                  as={Input}
                  w={"100%"}
                  type="number" 
                  min="0"
                  id="totalPreguntas" 
                  name="totalPreguntas" />
                <FormErrorMessage>{errors.totalPreguntas}</FormErrorMessage>
              </FormControl>

              <FormControl display="flex" flexDirection="column" justifyContent="center" isInvalid={errors.estado && touched.estado}>
                <FormLabel htmlFor="estado">Estado</FormLabel> 
                <Field
                  name="estado"
                  as={Select}
                  mt="10px"
                  id="estado"
                  type="text"
                  maxW={["100%", "300px", "350px", "400px"]}
                  w="100%"
                >
                  <option value={"true"}>Activo</option>
                  <option value={"false"}>Inactivo</option>
                </Field>
                <FormErrorMessage>{errors.estado}</FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl 
              isInvalid={errors.descripcion && touched.descripcion}
              display={"flex"}
              flexDir={"column"}
              gap={"10px"}
              mb={"10px"}
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

            <Flex flexDir={"column"} gap={"15px"}>
              <Accordion border={"white"} allowMultiple width={"100%"}>
                <FieldArray name={"nuevo"}>
                  {
                    (arrayHelpers)=>(
                      datos && datos.valoresCategorias.map((categoria,index)=>(
                        <AccordionItem w={"100%"}>
                          <AccordionButton width={"100%"} p={"15px"} borderRadius={"8px"} display={"flex"} justifyContent={"space-between"}>
                            <FormLabel >{categoria.Categoria.nombre}</FormLabel> 
                            <AccordionIcon/>
                          </AccordionButton>
                          <AccordionPanel>
                            <Flex w={"100%"}  flexDir={["column", "column", "row"]} gap={"20px"}>
                              <Box w={"100%"}>
                                <Box color={"gray.500"}>Cantidad de Preguntas</Box> 

                                <Field
                                  as={Input}
                                  type="number"
                                  min="0"
                                  name={`nuevo.${index}.2`}
                                  placeholder="Cantidad de Preguntas"
                                />

                              </Box>
                              <Box w={"100%"}>
                                <Box color={"gray.500"}>Porcentaje</Box> 

                                <Field
                                  as={Input}
                                  type="number"
                                  min="0"
                                  name={`nuevo.${index}.1`}
                                  placeholder="Valor de las preguntas"
                                />
                              </Box> 
                            </Flex>
                          </AccordionPanel>
                        </AccordionItem>
                      ))
                    )
                  }
                </FieldArray>
              </Accordion>
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

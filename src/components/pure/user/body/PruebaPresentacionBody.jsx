import React, {useContext, useState}from "react";
import {useEffect} from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosApi from "../../../../utils/config/axios.config"
import { AppContext } from "../../../context/AppProvider";
import {Image, Box, Text, Button, Divider, Flex, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

const PruebaPresentacionBody = ({}) =>{
    const {isInPrueba,setIsInPrueba, tiempoInicial, role, token} = useContext(AppContext)
    const {id} = useParams()
    const [preguntas, setPreguntas] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionText, setQuestionText] = useState("");
    const [questionImage, setQuestionImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [opciones, setOpciones] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);

    const showQuestion = (index) => {
        resetState();
        let currentQuestion =  preguntas[index];
        let questionNumber = index + 1;
        setQuestionImage(currentQuestion.imagen)
        setQuestionText(`${questionNumber}. ${currentQuestion.texto}`);
        setOpciones(currentQuestion.opciones)
    };  

    const selectChoice = (index) =>{
        setSelectedAnswer(index)
    }

   
     const resetState = () => {
    setOpciones([]);
    //setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

    const nextQuestion = () => currentQuestionIndex+1 < preguntas.length && setCurrentQuestionIndex(currentQuestionIndex+1)
    const prevQuestion = () => currentQuestionIndex>0 && setCurrentQuestionIndex(currentQuestionIndex-1)

    const terminarPrueba = async (id, mensaje) =>{
        const response = await axiosApi.post(`/api/convocatoria/${id}/terminarPrueba`,{},{
            headers:{
                Authorization: "Bearer " + token
            }
        }).catch(e=>{
            toast.error(e)
        })
        if(response.status===200){
            toast.success(mensaje)
        }
    }


    const obtenerPreguntasPrueba = async (id) =>{
        const response = await axiosApi.get(`/api/convocatoria/${id}/getPreguntas`,{
            headers:{
                Authorization:"Bearer " + token
            }
        }).catch(e=>{
            toast.error("No se pueden obtener las preguntas de la prueba")
        })
        setPreguntas(response.data)
        setIsLoading(false)
    }

    if(tiempoInicial===0){
            terminarPrueba(id,"El tiempo se ha agotado, prueba finalizada con exito")
            setIsInPrueba(prev => "false")
            sessionStorage.setItem("isInPrueba", false)
    }

    useEffect(()=>{
        obtenerPreguntasPrueba(id)
    },[])

    useEffect(()=>{
        !isLoading && showQuestion(currentQuestionIndex)
    },[isLoading, currentQuestionIndex])

    if(isLoading){
        return(
                <Spinner mt={"300px"}/>
        )
    }

    return(
        <>
            <Box w={"400px"} p={"20px"} backgroundColor={"white"} borderRadius={"8px"}>
                <Text fontSize={"20px"}>{questionText}</Text>
                { questionImage && <Image w={"100%"} m={"10px auto"} objectFit={"cover"}
              src={questionImage.url} />}
                <Divider m={"10px"}/>
                <Flex flexDir={"column"} gap={"10px"}>
                    {opciones&&opciones.map((o, index) => (
                        <Box
                            key={index}
                            textAlign={"left"} 
                            onClick={() => {
                            selectChoice(index)}}
                            backgroundColor={selectedAnswer===index?"#e4fcbc":"cuarto.100"}
                            fontSize={"17px"}
                            borderRadius={"10px"}
                            p={"10px"}
                        >
                            {o}
                        </Box>
                    ))}
                    <Flex justifyContent={"space-between"}>
                        <Button colorScheme={"red"}   onClick={()=>prevQuestion()}>Anterior</Button>
                        {
                            currentQuestionIndex+1!==preguntas.length ?
                        <Button colorScheme={"blue"}  onClick={()=>nextQuestion()}>Siguiente</Button>
                        :
                         <Button colorScheme={"green"} onClick={()=>{
                             terminarPrueba(id,"Prueba finalzada correctamente") 
                             setIsInPrueba(prev => "false")
                             sessionStorage.setItem("isInPrueba", false)
                             sessionStorage.removeItem("idConvocatoria")

                        }}>Finalizar</Button>
                        }
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default PruebaPresentacionBody

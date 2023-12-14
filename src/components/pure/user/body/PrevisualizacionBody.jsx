import React, {useContext, useState}from "react";
import {useEffect} from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../../../utils/config/axios.config"
import { AppContext } from "../../../context/AppProvider";
import {Image, Box, Text, Button,Radio, Divider, Flex, Spinner } from "@chakra-ui/react";
import Cookies from "js-cookie";

const PrevisualizacionBody = ({}) =>{
    const {token} = useContext(AppContext)
    const {id} = useParams()
    const [preguntas, setPreguntas] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionText, setQuestionText] = useState("");
    const [questionImage, setQuestionImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [opciones, setOpciones] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const navigate = useNavigate()
    const [questionId, setQuestionId] = useState(null);

    const showQuestion = (index) => {
        resetState();
        let currentQuestion =  preguntas[index];
        let questionNumber = index + 1;
        setQuestionImage(currentQuestion.imagen)
        setQuestionId(currentQuestion.id)
        setQuestionText(`${questionNumber}. ${currentQuestion.texto}`);
        setOpciones(currentQuestion.opciones)
    };  


    const selectChoice = (index) =>{
        setSelectedAnswer(prev => index)
    }


    const resetState = () => {
        setOpciones([]);
        setSelectedAnswer(null);
    };

    const nextQuestion = () => {
        if(currentQuestionIndex+1 < preguntas.length){
            setCurrentQuestionIndex(currentQuestionIndex+1)
    }}
    const prevQuestion = () =>{ 
        if(currentQuestionIndex>0){
            setCurrentQuestionIndex(currentQuestionIndex-1)
        }
    }

    
    const obtenerPreguntasPrueba = async (id) =>{
        const response = await axiosApi.get(`/api/prueba/preguntas/${id}`,{
            headers:{
                Authorization:"Bearer " + token
            }
        }).catch(e=>{
            toast.error("No se pueden obtener las preguntas de la prueba")
        })
        setPreguntas(response.data)
        setIsLoading(false)
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
            <Box  p={"20px"} w={"70%"} 
                boxShadow={"rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"}
                backgroundColor={"white"} borderRadius={"8px"}>
                <Text fontSize={"20px"}>{questionText}</Text>
                { questionImage && <Image w={"60%"} m={"10px auto"} objectFit={"cover"}
                    src={questionImage.url} />}
                <Divider m={"10px"}/>
                <Flex flexDir={"column"} gap={"10px"}>
                    {opciones&&opciones.map((o, index) => (
                        <Box
                            _hover={{cursor:"pointer"}}
                            key={index}
                            textAlign={"left"} 
                            onClick={() => {
                                selectChoice(index)
                            }}
                            border={"2px solid"}
                            borderColor={selectedAnswer===index?"black":"black"}
                            backgroundColor={selectedAnswer===index?"black":"white"}
                            color={selectedAnswer===index?"white":"black"}
                            fontSize={"17px"}
                            borderRadius={"10px"}
                            p={"10px"}
                        >
                            {o}
                        </Box>
                    ))}
                    <Flex justifyContent={"space-between"} gap={"20px"} >
                        <Button w={"100%"} backgroundColor={"white"} color={"telegram.500"} border={"1px solid"} borderColor={"telegram.5000"}  onClick={()=>prevQuestion()}>Anterior</Button>
                        {
                            currentQuestionIndex+1!==preguntas.length ?
                                <Button w={"100%"} colorScheme={"telegram"} color="white"  onClick={()=>{
                                    nextQuestion()
                                }
                                    }>Siguiente</Button>
                                    :
                                    <Button w={"100%"} colorScheme={"green"} onClick={()=>{
                                        
                                        navigate("/pruebas")

                                    }}>Volver</Button>
                        }
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default PrevisualizacionBody

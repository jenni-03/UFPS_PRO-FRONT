import React, {useContext, useState}from "react";
import {useEffect} from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axiosApi from "../../../../utils/config/axios.config"
import { AppContext } from "../../../context/AppProvider";
import {Image, Box, Text, Button, Divider, Flex } from "@chakra-ui/react";
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
    const [selectedAnswer, setSelectedAnswer] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);

    const showQuestion = (index) => {
        //resetState();
        let currentQuestion =  preguntas[index];
        let questionNumber = index + 1;
        setQuestionImage(currentQuestion.imagen)
        setQuestionText(`${questionNumber}. ${currentQuestion.texto}`);
        setOpciones(currentQuestion.opciones)
    };  

   
    useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Personaliza el mensaje que se mostrará al intentar salir de la página
      const message = '¿Estás seguro de que quieres abandonar la página? Los cambios no se guardarán.';
      event.returnValue = message; // Para navegadores más antiguos
      return message; // Para navegadores modernos
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Solo se ejecutará una vez al montar el componente


    const nextQuestion = () => selectedAnswer+1 < preguntas.length && setSelectedAnswer(selectedAnswer+1)
    const prevQuestion = () => selectedAnswer>0 && setSelectedAnswer(selectedAnswer-1)

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
            console.log("prueba use")
            setIsInPrueba(prev => "false")
            sessionStorage.setItem("isInPrueba", false)
    }

    useEffect(()=>{
        obtenerPreguntasPrueba(id)
    },[])

    useEffect(()=>{
        !isLoading && showQuestion(selectedAnswer)
    },[isLoading, selectedAnswer])

    return(
        <>
            <Box p={"20px"} backgroundColor={"white"} borderRadius={"8px"}>
                <Text fontSize={"20px"}>{questionText}</Text>
                { questionImage && <Image w={"50%"} m={"10px auto"} objectFit={"cover"}
              objectPosition={"center"} src={questionImage.url} />}
                <Divider m={"10px"}/>
                <Flex flexDir={"column"} gap={"10px"}>
                    {opciones&&opciones.map((o, index) => (
                        <Box
                            key={index}
                            textAlign={"left"} 
                            //className={`btn ${selectedAnswer === index ? (choice.answer ? "correct" : "incorrect") : ""}`}
                            onClick={() => selectChoice()}
                            style={{display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '16px',
                                padding: '0px 93px',
                                borderRadius: '4px',
                                width: '100%',
                                height: '60px',
                                fontSize: '20px',
                                fontWeight: '700',
                                transform: 'translateX(-4px) translateY(-4px)',
                                transition: 'all 0.2s',
                                border: "4px solid #571530",
                                backgroundColor: "gray",
                                color: "#3D0F22",
                                boxShadow: "4px 4px 0px 0px #571530",
                            }}
                            _hover={{
                            
                            }}
                        >
                            {o}
                        </Box>
                    ))}
                    <Flex justifyContent={"space-between"}>
                        <Button style={{
                                 justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '16px',
                                padding: '0px 93px',
                                borderRadius: '4px',
                                width: '100%',
                                height: '60px',
                                fontSize: '20px',
                                fontWeight: '700',
                                transform: 'translateX(-4px) translateY(-4px)',
                                transition: 'all 0.2s',
                                border: "4px solid #571530",
                                backgroundColor: "tomato",
                                color: "black",
                                boxShadow: "4px 4px 0px 0px #571530",
                        }} backgroundColor={"tomato"} onClick={()=>prevQuestion()}>Anterior</Button>
                        {
                            selectedAnswer+1!==preguntas.length ?
                        <Button style={{
                                 justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '16px',
                                padding: '0px 93px',
                                borderRadius: '4px',
                                width: '100%',
                                height: '60px',
                                fontSize: '20px',
                                fontWeight: '700',
                                transform: 'translateX(-4px) translateY(-4px)',
                                transition: 'all 0.2s',
                                border: "4px solid #571530",
                                backgroundColor: "dodgerblue",
                                color: "black",
                                boxShadow: "4px 4px 0px 0px #571530",
                        }} backgroundColor={"tomato"} onClick={()=>nextQuestion()}>Siguiente</Button>
                        :
                         <Button style={{
                                 justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '16px',
                                padding: '0px 93px',
                                borderRadius: '4px',
                                width: '100%',
                                height: '60px',
                                fontSize: '20px',
                                fontWeight: '700',
                                transform: 'translateX(-4px) translateY(-4px)',
                                transition: 'all 0.2s',
                                border: "4px solid #571530",
                                backgroundColor: "aquamarine",
                                color: "black",
                                boxShadow: "4px 4px 0px 0px #571530",
                         }} backgroundColor={"tomato"} onClick={()=>{
                             terminarPrueba(id,"Prueba finalzada correctamente") 
                             setIsInPrueba(prev => "false")
                             sessionStorage.setItem("isInPrueba", false)

                        }}>Finalizar</Button>
                        }
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default PruebaPresentacionBody

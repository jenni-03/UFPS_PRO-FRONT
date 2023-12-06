import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React,{useContext, useEffect, useState} from "react";
import { AppContext } from "./context/AppProvider";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

export default function NavBar({ changeOpen, msg, isOpen }) {

  const { isInPrueba, tiempoInicial }=useContext(AppContext)
 const [formattedTime, setFormattedTime] = useState("");
   
  
  function formatTime(totalMinutes) {

    const hours = Math.floor(totalMinutes/ 3600);
    const minutes = Math.floor((totalMinutes% 3600) / 60);
    const seconds = totalMinutes% 60;
     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    // Puedes agregar segundos si los tienes disponibles

}


  useEffect(() => {
    setFormattedTime(formatTime(parseInt(tiempoInicial)));
  }, [tiempoInicial]);


  return (
    <Flex
      w={"100%"}
      bgColor={"white"}
      boxShadow={"5px -4px 15px rgba(0,0,0,0.3)"}
      h={"72px"}
      p={"10px"}
      alignItems={"center"}
      gap={"20px"}
    >{ isInPrueba === "false" ? 
      <Icon
        cursor={"pointer"}
        onClick={() => {
          changeOpen();
        }}
        as={isOpen ? AiOutlineMenuUnfold : AiOutlineMenuFold}
        fontSize={"20px"}
      ></Icon>: null}
      {  isInPrueba === "false" ? <Text>{msg}</Text> : <Flex w={"100%"} alignItems={"center"} justifyContent={"center"}><Text fontWeight={"bold"}>{formattedTime}</Text></Flex>  }
    </Flex>
  );
}

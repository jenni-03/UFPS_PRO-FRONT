import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React,{useContext, useEffect} from "react";
import { AppContext } from "./context/AppProvider";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

export default function NavBar({ changeOpen, msg, isOpen }) {

  const { isInPrueba, tiempoInicial }=useContext(AppContext)
   
  console.log(isInPrueba)

  return (
    <Flex
      w={"100%"}
      bgColor={"white"}
      boxShadow={"5px -4px 15px rgba(0,0,0,0.3)"}
      h={"72px"}
      p={"10px"}
      alignItems={"center"}
      gap={"20px"}
    >{ true? 
      <Icon
        cursor={"pointer"}
        onClick={() => {
          changeOpen();
        }}
        as={isOpen ? AiOutlineMenuUnfold : AiOutlineMenuFold}
        fontSize={"20px"}
      ></Icon>: null}
      { true? <Text>{msg}</Text> : <Flex justifyContent={"space-between"}><Text>Tiempo Restante: {tiempoInicial} </Text><Button>Finalizar</Button></Flex>  }
    </Flex>
  );
}

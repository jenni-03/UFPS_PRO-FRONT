import { Box, Button, Center, Image } from "@chakra-ui/react";
import React from "react";
import LogoPrincipal from "../../assets/images/LogoPrincipal.jpg"

export default function CardLogo({ children, wd, hg, p }) {

  //bgImage={"url(https://svgshare.com/i/yYp.svg)}"
  return (
    <Center h="100vh" >
      <Box
        bg="white"
        width={wd}
        height={hg}
        borderWidth="1px"
        borderRadius="20px"
        overflow="hidden"
        pt="10px"
        px={8}
        p={p}
        borderColor={"gray.300"}
      >
        <Image
          //src="https://i.ibb.co/Cwg7p4d/Logo1.jpg"
          src={LogoPrincipal}
          //borderRadius="full"
          boxSize="150px"
          width={"170px"}
          mx="auto"
          my={0}
          alt="Logo"
        />
        {children}
      </Box>
    </Center>
  );
}

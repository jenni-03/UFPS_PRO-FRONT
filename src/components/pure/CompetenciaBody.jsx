import {React, useContext, useEffect, useState} from "react";
import TablaCustom from "./TablaCompetencia";
import { RiEdit2Fill } from "react-icons/ri";
import { Center } from "@chakra-ui/react";
import { AppContext } from "../context/AppProvider";
import axiosApi from "../../utils/config/axios.config";
import { toast, Toaster } from "react-hot-toast";

export default function CompetenciaBody() {


  const columns = ["id","Nombre", "Estado","Categorías", "Editar"];
 
  return (
    <>
      <TablaCustom
      columns={columns}
      path={"/formularioCompetencia"}
      msg={"Agregar Competencia"}
      showButton={true}
    />
    
    
    </>
  );
}

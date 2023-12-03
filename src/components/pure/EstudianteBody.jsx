import React,{useContext, useEffect, useState, useRef} from 'react'
import { AppContext } from '../context/AppProvider';
import TablaComponent from './TablaComponent';
import axiosApi from '../../utils/config/axios.config'
import { Button, Icon , AlertDialog, useDisclosure, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Text, Box} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import TablaEstudiantes from "./TablaEstudiantes"
import { toast } from 'react-hot-toast';
import { AiOutlineEdit , AiOutlineDelete} from 'react-icons/ai';

export default function EstudianteBody() {


  return (
    <TablaEstudiantes
      ancho={"1090px"}
      colsR={7}
      wCampo={"200px"}
    />
  )
}

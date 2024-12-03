import { React, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import options from "../../utils/config/variableconfig";
import * as CryptoJS from 'crypto-js';

export const AppContext = createContext();

export function AppProvider({ children }) {

  const encriptar = (keySession,valueSession) =>{
    //const text_encrypt = CryptoJS.AES.encrypt(valueSession,options.secretPassword).toString()
    sessionStorage.setItem(keySession, valueSession);
  }

  const desencriptar = (keySession) =>{
    const valueSession = sessionStorage.getItem(keySession);

    if (valueSession) {
      //let text_decrypt = CryptoJS.AES.decrypt(valueSession, options.secretPassword);

      //if (text_decrypt) {
      //  text_decrypt = text_decrypt.toString(CryptoJS.enc.Utf8);
        return valueSession;
      //}
    }

  }

  const [open, setOpen] = useState(false);
  const change = () => setOpen(!open);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [imagen, setImagen] = useState();

  const [token, setToken] = useState(() =>desencriptar("token") || null);
  const [isInPrueba, setIsInPrueba] = useState(() => desencriptar("isInPrueba") || null);
  const [tiempoInicial,setTiempoInicial] = useState(()=>desencriptar("time")|| null)
  const [idConvocatoria,setIdConvocatoria] = useState(()=>desencriptar("idConvocatoria")||null)




  useEffect(() => {
    setImagen(sessionStorage.getItem("imagen"));
    if (token) {
      decodeToken();
    }
  }, []);



  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoInicial > 0 && isInPrueba==="true") {
        const tiempo = parseInt(tiempoInicial)
        const tiempoReal = tiempo - 1
        setTiempoInicial(tiempoReal.toString());
        encriptar("time",tiempoReal.toString())
      } else {
        clearInterval(intervalo);
        sessionStorage.setItem("time",0 )
        sessionStorage.removeItem("time")
        setTiempoInicial(0);
      }
    }, 1000);
    return () => clearInterval(intervalo);
  }, [tiempoInicial, setTiempoInicial]);




  const decodeToken = () => {
    if(token){
      const decode = jwt_decode(token);
      const rol = decode.tipo;
      const email = decode.username;
      const id = decode.id;
      setId(id);
      setRole(rol);
      setUser(email);
    }};

  return (
    <AppContext.Provider
      value={{
        open,
        change,
        user,
        setImagen,
        imagen,
        setUser,
        token,
        role,
        setRole,
        tiempoInicial,
        setToken,
        id,
        setId,
        isInPrueba,
        setTiempoInicial,
        setIdConvocatoria,
        idConvocatoria,
        setIsInPrueba,
        encriptar,
        desencriptar
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

import { React, createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [open, setOpen] = useState(false);
  const change = () => setOpen(!open);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem("token"));
  const [imagen, setImagen] = useState();
  const [isInPrueba, setIsInPrueba] = useState(()=> sessionStorage.getItem("isInPrueba"))
  const [tiempoInicial,setTiempoInicial] = useState(()=>sessionStorage.getItem("time"))
  const [idConvocatoria,setIdConvocatoria] = useState(()=>sessionStorage.getItem("idConvocatoria"))

  useEffect(() => {
    setImagen(sessionStorage.getItem("imagen"));
    if (token) {
      decodeToken("token");
    }
  }, []);



  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoInicial > 0 && isInPrueba==="true") {
        setTiempoInicial(tiempoInicial- 1);
        sessionStorage.setItem("time", tiempoInicial-1)
      } else {
        clearInterval(intervalo);
        // Aquí podrías ejecutar alguna lógica adicional cuando el cronómetro llegue a cero
      }
    }, 1000);
      return () => clearInterval(intervalo);
  }, [tiempoInicial, setTiempoInicial]);




  const decodeToken = (a) => {
    const decode = jwt_decode(sessionStorage.getItem(a));
    const rol = decode.tipo;
    const email = decode.username;
    const id = decode.id;
    setId(id);
    setRole(rol);
    setUser(email);
  };

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
        setIsInPrueba
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

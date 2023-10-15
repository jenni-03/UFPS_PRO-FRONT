import {React, createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';
import { AiFillInfoCircle } from 'react-icons/ai';

export const AppContext = createContext();

export function AppProvider({children}) {

  const [open, setOpen] = useState(false);
  const change = () => setOpen(!open);
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [id, setId] = useState(null)
  const [token, setToken] = useState(()=>localStorage.getItem("token"))
   //const [token, setToken] = useState(()=>Cookies.get("token"))
  const [imagen, setImagen] = useState()

  useEffect(()=>{
    setImagen(localStorage.getItem("imagen"))
    if(token){
      decodeToken("token")
    }
  },[])

  const [showAlert,setShowAlert] = useState(false)

  const AlertaToken = () =>(
          <AlertDialog 
         isOpen={showAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Su token ha expirado
            </AlertDialogHeader>

            <AlertDialogBody>
              Por su seguridad su sesión esta a salvo con un sistema de alta seguridad, por favor vuelva a iniciar sesión
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button>
                Cancel
              </Button>
              <Button ml={3}>
                Aceptar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )

    useEffect(()=>{
    if(role){
    const timeout = setTimeout(()=>{
      localStorage.removeItem("token")
      setToken(localStorage.removeItem("token"))
      setShowAlert(true)
      setRole(null)
toast.success('Su sesión ha expirado, por favor ingrese nuevamente', {
  duration: 4000,
  position: 'top-center',
  style: {
    width:"270px",
  },
  className: '',
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },
});
    },3600000) 
  }},[user])

  const decodeToken = (a) =>{
    const decode = jwt_decode(localStorage.getItem(a))
    //const decode = jwt_decode(Cookies.get(a))
    const rol = decode.tipo
    const email = decode.username
    const id = decode.id
    setId(id)
    setRole(rol)
    setUser(email)
  }

  return (
    <AppContext.Provider value={{open,change, user,setImagen,imagen, setUser, token,role,setRole, setToken, id, setId}}>
      {children}
    </AppContext.Provider>
  )
}

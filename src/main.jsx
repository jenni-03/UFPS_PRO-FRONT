import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
  fonts: {
    body: "Open Sans"
  },
  colors: {
    primero: {
      100: "#484c64" 
    },
    segundo:{
      100: "#edf2f7"
    },
    tercero:{
       100: "#ffffff"
    },
    cuarto:{
      100:"#f1f7fc"
    },
    quinto:{
      100:"#1a202c"
    }
  },  
  breakpoints: {
    base: "0em",
    sm: '30em', 
    md: '48em', 
    lg: '62em', 
    xl: '80em', 
    '2xl': '96em', 
    tableBreakpoint: "1168px",
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '10px',
        height: "5px"
      },
      '::-webkit-scrollbar-thumb': {
        background: '#cecece',
        borderRadius: '8px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'gray.400',
      },
      '::-webkit-scrollbar-track': {
        background: '#f0f0f0',
        borderRadius: '8px',
      },
    },
  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode >
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider> 
  </React.StrictMode>,
)

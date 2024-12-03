import React,{useContext,useEffect,useState} from "react";
import { AppContext } from "../../../../context/AppProvider";
import { Spinner } from "@chakra-ui/react";
import axiosApi from "../../../../../utils/config/axios.config"
import { Flex,Button} from "@chakra-ui/react";
import BarChart from "../../../charts/BarChart";
import { Chart } from "chart.js";
import DoughnutChart from "../../../charts/DoughnutChart";
// import ChartJsImage from "chartjs-to-image";
import { Document, Page, Text, View, PDFViewer, StyleSheet, Image} from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import LogoPrincipal from "../../../../../assets/images/LogoPrincipal.jpg"
const ResultadosXestudianteBody = ({id_conv,id_estudiante}) =>{

    const {open,token} = useContext(AppContext)
    const [loading, setLoading] = useState(true)
    const [datos, setData] = useState(true)
    const [categorias,setCategorias]=useState([])
    const [valores,setValores]=useState([])
    const [puntajes, setPuntajes]=useState([])
    const [valorTotal,setValorTotal]=useState(0)
    const [imageBarSrc,setImageBarSrc] = useState(null)
    const [imageDonutSrc,setImageDonutSrc] = useState(null)
    const [puntajeTotal,setPuntajeTotal]=useState(0)
    const [user,setUser] = useState({})
    const date = new Date().toLocaleString("en-US", {timeZone: "America/New_York"})



    const createChartBar = (labels, datos, titulo) =>{


        // const myChart = new ChartJsImage();
        // myChart.setConfig({
        //     type: 'bar',
        //     data: {
        //         labels: labels,
        //         datasets: [
        //             {
        //                 label: titulo,
        //                 data: datos,
        //                 backgroundColor: [
        //                     'rgba(255, 99, 132, 0.1)',
        //                     'rgba(54, 162, 235, 0.1)',
        //                     'rgba(255, 206, 86, 0.1)',
        //                     'rgba(192, 65, 192, 0.1)',
        //                     'rgba(200, 230, 65, 0.1)',
        //                     'rgba(255, 192, 192, 0.1)',
        //                     'rgba(150, 5, 152, 0.1)',
        //                 ],
        //                 borderColor:[
        //                     'rgba(255, 99, 132, 0.6)',
        //                     'rgba(54, 162, 235, 0.6)',
        //                     'rgba(255, 206, 86, 0.6)',
        //                     'rgba(192, 65, 192, 0.6)',
        //                     'rgba(200, 230, 65, 0.6)',
        //                     'rgba(255, 192, 192, 0.6)',
        //                     'rgba(150, 5, 152, 0.6)',
        //                 ],
        //                 borderWidth: 3,
        //             }
        //         ]
        //     },
        //     options:{
        //         plugins: {
        //             datalabels: {
        //                 anchor: 'center', // Ubicación de la etiqueta (end, center, start, etc.)
        //                 align: 'end',
        //             }
        //         }}}
        // );

        // // Convertir el gráfico a una imagen
        // myChart.setWidth(800).setHeight(300);
        // setImageBarSrc(myChart.getUrl())

    }


    const createChartDonut = (labels, datos) =>{


        // const myChart = new ChartJsImage();
        // myChart.setConfig({
        //     type: 'doughnut',
        //     data: {
        //         labels: labels,
        //         datasets: [
        //             {
        //                 data: datos,
        //                 backgroundColor: [
        //                     'rgba(255, 99, 132, 0.6)',
        //                     'rgba(54, 162, 235, 0.6)',
        //                     'rgba(255, 206, 86, 0.6)',
        //                     'rgba(192, 65, 192, 0.6)',
        //                     'rgba(200, 230, 65, 0.6)',
        //                     'rgba(255, 192, 192, 0.6)',
        //                     'rgba(150, 5, 152, 0.6)',
        //                 ],
        //                 borderWidth: 3,
        //             }
        //         ]
        //     }}
        // );

        // // Convertir el gráfico a una imagen
        // myChart.setWidth(800).setHeight(300);
        // setImageDonutSrc(myChart.getUrl())

    }

    const styles = StyleSheet.create({
        body: {
            fontSize: "14px",
            paddingTop: 30,
            paddingLeft:60,
            paddingRight:60,
            lineHeight: 1.5,
            flexDirection: 'column',
        },
        subtitle:{
            textAlign:"left",
            fontSize:"13px",
            padding:"15px 0"
        },
        date:{
            textAlign:"right",
            color:"gray",
            fontSize:"10px",
        },
        titleImage:{
            width:"130px",
            height:"115px",
            margin:"0 auto"
        },
        title: {
            fontSize: 20,
            textAlign: 'center',
            letterSpacing:"3px",
            marginBottom:"15px"
        },
        author: {
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 40,
        },
        text: {
            margin: 12,
            textAlign: 'justify',
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
        },
        header: {
            borderTop: 'none',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
        table:{
            width:"100%",
            border: '1px solid black',
        },

        row: {
            display: 'flex',
            flexDirection: 'row',
            borderTop: '1px solid black',
            paddingTop: 8,
            paddingBottom: 8,
            textAlign:"center"
        },
        bold: {
            backgroundColor:"#abced6",

        },
        row1: {
            width: '27%',
            fontSize:"10px",
            textAlign:"center",
        },
        colorGray:{
            color:"gray"
        },
        row2: {
            width: '50%',
            fontSize:"10px",
            textAlign:"center",
        },
        row3: {
            width: '15%',
        },
        row4: {
            width: '20%',
        },
        row5: {
            width: '27%',
        },
        espacio:{
            marginBottom:"20px"
        },
        subtitle2:{
            textAlign:"center",
            fontSize:"10px",
            padding:"5px 0"
        },
    }
    );

    const ContenidoPDF = () =>{
        return(
            <Document title="hola">
                <Page size="A4" style={styles.body}>
                    <Text style={styles.date}>{date.replace(",","")}</Text>
                    <Image style={styles.titleImage} src={`${LogoPrincipal}`} ></Image>
                    <Text style={styles.title}>INFORME</Text>
                    <Text style={styles.subtitle}>Datos del estudiante</Text>
                    <View style={styles.table}>
                        <View style={[styles.row, styles.bold, styles.header]}>
                            <Text style={styles.row1}>Nombre</Text>
                            <Text style={styles.row1}>Código</Text>
                            <Text style={styles.row2}>Email</Text>
                            <Text style={styles.row1}>semestre</Text>
                        </View>
                        <View style={styles.row} >
                            <Text style={[styles.row1, styles.colorGray]}>{user.nombre} {user.apellido}</Text>
                            <Text style={[styles.row1, styles.colorGray]}>{user.codigo}</Text>
                            <Text style={[styles.row2, styles.colorGray]}>{user.email}</Text>
                            <Text style={[styles.row1, styles.colorGray]}>{user.semestre}</Text>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Resultado</Text>
                    <View style={[styles.table,styles.espacio]}>
                        <View style={[styles.row, styles.bold, styles.header]}>
                            <Text style={styles.row2}>Prueba</Text>
                            <Text style={styles.row2}>Puntaje Total</Text>
                        </View>
                        <View style={styles.row} >
                            <Text style={[styles.row2, styles.colorGray]}>{datos.nombre_prueba}</Text>
                            <Text style={[styles.row2, styles.colorGray]}>{puntajeTotal}</Text>
                        </View>
                    </View>
                    <Text style={styles.subtitle}>Gráficas</Text>
                    <Text style={[styles.subtitle2,{color:"gray"}]}>Resultados por categoría</Text>
                    <Image style={styles.espacio} src={`${imageBarSrc}`} ></Image>
                    <Text style={[styles.subtitle2,{marginTop:"110px",color:"gray"}]}>Valor porcentual por categría</Text>
                    <Image src={`${imageDonutSrc}`} ></Image>
                </Page>
            </Document>
        )
    }

    const DownloadPDF = () =>{
        return(
            <PDFDownloadLink document={<ContenidoPDF />} fileName={`${user.codigo}_resultados.pdf`}>
                {({ blob, url, loading, error }) => (<Button colorScheme={"facebook"}>{loading ? 'Cargando documento...' : 'Descargar PDF'}</Button>)}
            </PDFDownloadLink>
        )
    }

    const obtenerData = async() =>{
        const response = await axiosApi.get(`api/resultados/estudiante/${id_estudiante}/convocatoria/${id_conv}`,{
            headers:{
                Authorization:"Bearer " + token

            }})
            .catch((e)=>{
                toast.error(e.response.data.error)
            })
        if(response.status=200){
            const categorias = response.data.resultados.map(c => c.nombre_categoria)
            const data = response.data
            const valores = response.data.resultados.map(c => c.valor_categoria)
            const valorTotal = response.data.puntaje_total_prueba
            const puntajes = response.data.resultados.map(c => c.puntaje)
            const userInfo = response.data.userInfo
            const puntajeTotal =  puntajes.reduce((a, b) => a + b, 0);
            setData(data)
            setCategorias(categorias)
            setValores(valores)
            setValorTotal(valorTotal)
            setPuntajes(puntajes)
            createChartBar(categorias,puntajes, data.nombre_prueba )
            createChartDonut(categorias,valores)
            setUser(userInfo)
            setPuntajeTotal(puntajeTotal)
            setLoading(false)
        }
    }

    useEffect(()=>{
        obtenerData()
    },[])


    if(loading){
        return <Spinner color={"black"} size={"xl"} m={"20% auto"}  ></Spinner>
    }



    return (

        <Flex  w={!open?"calc(100% - 10px)":"100%"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap={"20px"} >
            <BarChart datos={puntajes} labels={categorias}  titulo={datos.nombre_prueba} valorTotal={valorTotal} /> 
            <DoughnutChart datos={valores} labels={categorias}/>
            <DownloadPDF/>
        </Flex>
    )
}

export default ResultadosXestudianteBody

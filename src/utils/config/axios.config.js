import axios from "axios";

//Defautl config for axios
export default axios.create(
    {
        baseURL: "http://127.0.0.1:3500/",
        //baseURL: "https://ufpspro-production-e52c.up.railway.app/",
        responseType: "json",
        timeout: 15000,
        withCredentials: true,
    }
)

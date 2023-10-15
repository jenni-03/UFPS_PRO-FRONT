import axios from "axios";

//Defautl config for axios
export default axios.create(
    {
        baseURL: "https://ufpspro-production.up.railway.app/",
        responseType: "json",
        timeout: 6000,
        withCredentials: true,
    }
)

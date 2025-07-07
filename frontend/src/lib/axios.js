import axios from "axios"


export const axiosInstance = axios.create({
    baseURL:"http://192.168.1.119:5001/api",
    withCredentials:true, //send the cookies in every request
})
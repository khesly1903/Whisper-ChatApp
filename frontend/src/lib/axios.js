import axios from "axios"


export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    // baseURL:"http://192.168.1.119:5001/api",
    withCredentials:true, //send the cookies in every request
})
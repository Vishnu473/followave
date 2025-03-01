import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:8000/api/v1",
    withCredentials:true,
    timeout:10000
})

api.interceptors.request.use(
    //Handle the token from local storage if needed
    (response) => response,
    (error) => {
        console.error("API Error: ",error.response || error.message);
        return Promise.reject(error);
    }
)
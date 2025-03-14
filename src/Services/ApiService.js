import axios from "axios";

export const api = axios.create({
    baseURL:"https://followave-backend.onrender.com/api/v1",
    withCredentials:true,
    timeout:30000 //As using onRender website for server(take more time when server is unused to hit the first api)
})

api.interceptors.request.use(
    //Handle the token from local storage if needed
    (response) => response,
    (error) => {
        console.error("API Error: ",error.response || error.message);
        return Promise.reject(error);
    }
)
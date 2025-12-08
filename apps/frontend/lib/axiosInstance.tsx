
import { HTTPS_URL } from "@/app/config";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL:HTTPS_URL ,
    withCredentials:true
});

export default axiosInstance ;



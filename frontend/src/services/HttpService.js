import axios from "axios";
import { BACKEND_URL } from "../constant";


export const HttpService = axios.create({
    baseURL : BACKEND_URL,
    headers: {
        'Content-Type' : 'application/json'
    }
});
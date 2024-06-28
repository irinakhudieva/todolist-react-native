import axios from "axios";
import { REACT_APP_TODO_API } from "@env";

const baseUrl = REACT_APP_TODO_API;

export const todoApi = axios.create({
    baseURL: baseUrl
});


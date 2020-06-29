import axios from 'axios'
import {BASE_URL} from "../constants";
// axios.defaults.baseURL = BASE_URL
// axios.interceptors.response.use(res=>res.data)

export const reqArticle = (path)=>{
    return axios.get('https://cnodejs.org/api/v1'+path);
}
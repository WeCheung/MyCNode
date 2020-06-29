import axios from 'axios'
import {BASE_URL} from "../constants";
axios.defaults.baseURL = BASE_URL
axios.interceptors.response.use(res=>res.data)

export const reqUser = (username) => {
    return axios.get('/user/' + username)
}
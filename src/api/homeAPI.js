import axios from 'axios'
import {BASE_URL} from "../constants";
// axios.defaults.baseURL = BASE_URL
// axios.interceptors.response.use(res=>res.data)

export const reqArticles = (limit)=>{
    return axios.get('https://cnodejs.org/api/v1/topics', {
        params:{
            limit
            , page: 1
            , mdrender: 'false'
        }
    })
}
import axios from "axios"
import { SERVER_PATH } from "../config/index";

export const GetPublicGist = async()=>{
    try{
        const URL = SERVER_PATH + '/public/gists'
        const publicgists = await axios.get(URL).then(res=>res.data).catch(e=>console.log(e))
        return publicgists?.data
    }catch(e){
        throw new Error(e)
    }
}
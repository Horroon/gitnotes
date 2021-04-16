import axios from "axios"
import { SERVER_PATH } from "../config/index";

export const GetID = async()=>{
    try{
        const URL = SERVER_PATH + '/permission/id';
        const id = await axios.get(URL).then(res=>res.data.id).catch(e=>console.log(e))
        return id
    }catch(e){
        throw new Error(e)
    }
}
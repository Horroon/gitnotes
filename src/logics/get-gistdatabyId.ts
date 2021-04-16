import axios from "axios";
import { SERVER_PATH } from "../config/index";

export const GetGistById = async(gistId:string)=>{
    const URL = SERVER_PATH + `/get/gist?gistId=${gistId}`;
    const response = await axios.get(URL).then(res=>res.data).catch(e=>new Error(e))
    return response
}
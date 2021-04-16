import axios from "axios";
import { SERVER_PATH } from "../config/index";

export const GetAuthenticatedUserGists = async(username:string)=>{
    try{
        const URL = SERVER_PATH + `/user/gist?username=${username}`;
        const usergists = await axios.get(URL).then(res=>res.data).catch(e=>console.log(e))
        return usergists?.data
    }catch(e){
        throw new Error(e)
    }
}
import axios from 'axios';
import { SERVER_PATH } from "../config/index";

export const GetGitHubAccessToken = async(code:string):Promise<any>=>{
    const URL = SERVER_PATH + `/login/git?code=${code}&scope=gist`;
    return await axios.get(URL,{
        headers:{
          Accept:'application/json'
        }
      }).then(res=>res).catch(e=>console.log('error during login ', e))
}
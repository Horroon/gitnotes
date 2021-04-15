import axios from "axios";

export const GetAuthenticatedUserGists = async(username:string)=>{
    try{
        const usergists = await axios.get(`http://localhost:8080/gitnotes/user/gist?username=${username}`).then(res=>res.data).catch(e=>console.log(e))
        return usergists?.data
    }catch(e){
        throw new Error(e)
    }
}
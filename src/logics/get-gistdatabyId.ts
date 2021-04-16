import axios from "axios";

export const GetGistById = async(gistId:string)=>{
    const response = await axios.get(`http://localhost:8080/gitnotes/get/gist?gistId=${gistId}`).then(res=>res.data).catch(e=>new Error(e))
    return response
}
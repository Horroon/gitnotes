import axios from "axios"

export const GetPublicGist = async()=>{
    try{
        const publicgists = await axios.get(`http://localhost:8080/gitnotes/public/gists`).then(res=>res.data).catch(e=>console.log(e))
        return publicgists?.data
    }catch(e){
        throw new Error(e)
    }
}
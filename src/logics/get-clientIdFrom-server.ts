import axios from "axios"

export const GetID = async()=>{
    try{
        const id = await axios.get(`http://localhost:8080/gitnotes/permission/id`).then(res=>res.data.id).catch(e=>console.log(e))
        return id
    }catch(e){
        throw new Error(e)
    }
}
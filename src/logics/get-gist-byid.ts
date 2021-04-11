export const GetGistById = async(gistId:string)=>{
    return await fetch(`https://api.github.com/gists/${gistId}`,{method:"GET"}).then(res=>res.json()).then(resp=>resp).catch(e=>new Error(e));
}
export const ForkAGist = async(gistId:string)=>{
    return await fetch(` https://api.github.com/gists/${gistId}/forks`,
    {
        method:"POST",
        headers:{
            "Accept": "application/vnd.github.v3+json"
        }
}).then(res=>res.json()).then(resp=>resp).catch(e=>new Error(e));
}
export const GetPublicGist = async()=>{
    return await fetch('https://api.github.com/gists/public',{method:"GET"}).then(res=>res.json()).then(resp=>resp).catch(e=>new Error(e));
}
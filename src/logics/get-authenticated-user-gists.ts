export const GetAuthenticatedUserGists = async()=>{
    return await fetch('https://api.github.com/gists',{method:"GET"}).then(res=>res.json()).then(resp=>resp).catch(e=>new Error(e));
}
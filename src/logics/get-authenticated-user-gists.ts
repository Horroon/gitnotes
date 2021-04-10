export const GetAuthenticatedUserGists = async(username:string)=>{
    return await fetch(`https://api.github.com/users/${username}/gists`,{method:"GET"}).then(res=>res.json()).then(resp=>resp).catch(e=>new Error(e));
}
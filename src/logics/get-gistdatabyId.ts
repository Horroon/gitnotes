export const GetGistById = async(id:string):Promise<any>=>{
    return await fetch(`https://api.github.com/gists/${id}`).then(res=>res.json()).then(resp=> resp).catch(e=>console.log('error during fetching user file ', e))
}
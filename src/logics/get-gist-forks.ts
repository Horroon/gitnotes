export const GetGistForks = async(forkurl:string):Promise<any>=>{
    return await fetch(forkurl).then(res=>res.json()).then(resp=> resp).catch(e=>console.log('error during fetching user file ', e))
}
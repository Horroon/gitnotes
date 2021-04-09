export const GetGistUserFile = async(fileurl:string):Promise<any>=>{
    return await fetch(fileurl).then(res=>res.text()).then(resp=> resp).catch(e=>console.log('error during fetching user file ', e))
}
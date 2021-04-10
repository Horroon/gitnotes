export const CrateGistOnGit = async():Promise<any>=>{
    var gist = {
        "description": "Avatars",
        "public": true,
        "files": {
            "check.txt": {
                "content": "Avatars list..."
            }
        }
    };
    const accessToken  = sessionStorage.getItem('access-token')
    return await fetch(`https://api.github.com/gists`,
    {
        method:"POST",
        headers:{
            'Authorization':'bearer ' + accessToken,
        },
        body:JSON.stringify(gist)
        
    }).then(res=>res.json()).then(resp=> resp).catch(e=>console.log('error during fetching user file ', e))
}
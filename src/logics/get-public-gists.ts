export const GetPublicGist = async()=>{

    //const {gists} = await fetch('http://localhost:8080/gitnotes/public/gists',{method:"GET"}).then(resp=>resp.json()).then(resp=>resp).catch(e=>console.log('localserver error ', e));
    //console.log('localhost response ', lresponse)
    return await fetch('https://api.github.com/gists/public',{method:"GET"}).then(res=>res.json()).then(resp=>resp).catch(e=>new Error(e));
    //return gists
}
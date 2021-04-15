import axios from 'axios';

export const GetGitHubAccessToken = async(code:string):Promise<any>=>{
    return await axios.get(`http://localhost:8080/gitnotes/login/git?code=${code}&scope=gist`,{
        headers:{
          Accept:'application/json'
        }
      }).then(res=>res).catch(e=>console.log('error during login ', e))
}
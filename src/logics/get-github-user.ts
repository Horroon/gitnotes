import {store} from '../models/index'
export const GetGitHubUser = async(token:string):Promise<any>=>{
    const loginuser = await fetch('https://api.github.com/user',{
        method:"GET",
        headers:{
            Authorization:'Bearer ' + token
        }
    }).then(res=>res.json()).then(res=>{
        if (res?.login){
            const logininfo = {
                isLogged: true,
                userinfo: {
                  profile: res.avatar_url,
                  name: res.name,
                  username: res.login,
                  isdropdownOpened: false,
                },
              };
              store.dispatch.loginInfo.login({ ...logininfo });
              sessionStorage.setItem('username',res.login)
        }
        return res
    }).catch(e=>console.log('user data ', e))
    debugger
    return loginuser
}
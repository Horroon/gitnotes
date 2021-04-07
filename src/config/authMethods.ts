import firebase from './index';
import {store} from '../models/index';

export const gitHubProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(user=>{
    if(user){
        console.log('user is ', user)
        const loginstate = {
            isLogged: true,
            userinfo:{
                profile: user.photoURL || '',
                name: user.displayName || '',
                isdropdownOpened:false
            }
        }
        store.dispatch.loginInfo.login({...loginstate})
    }
    else {
        console.log('user not able ')
    }
})

export const SignoutCurrentUser = ()=>firebase.auth().signOut().then(res=>{
    store.dispatch.loginInfo.resetloginState()
}).catch(e=>console.log('error during signout ',e))
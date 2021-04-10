import firebase from './index';
import {store} from '../models/index';

export const gitHubProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(user=>{
    const username = sessionStorage.getItem('username')
    if(user && username){
        const loginstate = {
            isLogged: true,
            userinfo:{
                profile: user.photoURL || '',
                name: user.displayName || '',
                username:  username,
                isdropdownOpened:false
            }
        }
        store.dispatch.loginInfo.login({...loginstate})
    }
    else {
        store.dispatch.loginInfo.resetloginState()
        console.log('user not able ')
    }
})

export const SignoutCurrentUser = ()=>firebase.auth().signOut().then(res=>{
    store.dispatch.loginInfo.resetloginState();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access-token');
}).catch(e=>console.log('error during signout ',e))
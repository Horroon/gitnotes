import firebase from '../config/index';

const SocialMediaAuth = async(provider:any)=>{
    firebase.auth().signInWithPopup(provider).then(async(res:any)=>{
        console.log('auth response ', )
        sessionStorage.setItem('username', res.additionalUserInfo?.username || '');
        sessionStorage.setItem('access-token', res.credential.accessToken || '')
        
    }).catch(e=>{
        console.log('error in auth ', e);
    })
}

export default SocialMediaAuth
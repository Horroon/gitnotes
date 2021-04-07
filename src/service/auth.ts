import firebase from '../config/index';

const SocialMediaAuth = (provider:any)=>{
    firebase.auth().signInWithPopup(provider).then(res=>{
        console.log('auth response ', res)
    }).catch(e=>{
        console.log('error in auth ', e);
    })
}

export default SocialMediaAuth
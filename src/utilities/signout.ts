import { store } from "../models";
export const SignoutCurrentUser = ()=>{
    store.dispatch.loginInfo.resetloginState();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access-token');
}
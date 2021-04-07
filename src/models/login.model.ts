import {loginInfoFace} from '../constants/models.interfaces/login'
export const loginInfo = {
    state:<loginInfoFace>{
        isLogged: true,
        userinfo:{
            profile:'http://www.goodmorningimagesdownload.com/wp-content/uploads/2019/12/Profile-Picture-4.jpg',
            name:'Haroon',
            isdropdownOpened:false
        }
    },
    reducers:{
        login:(state:loginInfoFace, payload:any)=>{
            return {...state, ...payload} //send me object e.g ....{userinfo:{}}
        },
        updateinfo:(state:loginInfoFace, payload:any)=>{
            return {...state, ...payload} 
        },
        update_dropdown_status:(state:loginInfoFace, payload:boolean)=>({...state, userinfo:{...state.userinfo, isdropdownOpened: payload}})
    }
}
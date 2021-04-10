import {loginInfoFace} from '../constants/models.interfaces/login'
export const loginInfo = {
    state:<loginInfoFace>{
        isLogged: false,
        userinfo:{
            profile:'',
            name:'',
            username:'',
            isdropdownOpened:false
        }
    },
    reducers:{
        login:(state:loginInfoFace, payload:loginInfoFace)=>{
            return {...state, ...payload} //send me object e.g ....{userinfo:{}}
        },
        updateinfo:(state:loginInfoFace, payload:any)=>{
            return {...state, ...payload} 
        },
        update_dropdown_status:(state:loginInfoFace, payload:boolean)=>({...state, userinfo:{...state.userinfo, isdropdownOpened: payload}}),
        resetloginState:()=>({
            isLogged: false,
            userinfo:{
                profile:'',
                name:'',
                username:'',
                isdropdownOpened:false
            }
        })
    }
}
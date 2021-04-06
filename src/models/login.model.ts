export const loginInfo = {
    state:{
        isLogged: false,
        userinfo:{
            profile:'',
            name:'',
        }
    },
    reducers:{
        login:(state:any, payload:any)=>{
            return {...state, ...payload} //send me object e.g ....{userinfo:{}}
        },
        updateinfo:(state:any, payload:any)=>{
            return {...state, ...payload} 
        }
    }
}
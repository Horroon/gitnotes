import {subpaths} from '../constants/paths/index';

export const Route = {
    state:{
        currentRoute:''
    },
    reducers:{
        updateCurrentRoute:(state:any, payload:string)=>({
            ...state,
            currentRoute: payload
        }),
        resetRoute: (state:any, payload: string)=>({
            currentRoute:subpaths.publicgists
        })
    }
}
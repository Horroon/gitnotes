import {gistview, gistStateFace} from '../constants/models.interfaces/gists';

export const gistslist = {
    state:<gistStateFace>{
        view:gistview.row,
        gists:[],
        searchgistId:'',
    },
    reducers:{
        changegistview: (state:gistStateFace,payload:gistview)=>({...state, view: payload}),
        update_gist:(state:gistStateFace, payload:any[])=>({...state, gists: payload}),
        update_gist_search_id:(state:gistStateFace, payload:string)=>({...state, searchgistId: payload})
    }
}
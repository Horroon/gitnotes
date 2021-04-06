import {gistview, gistStateFace} from '../constants/models.interfaces/gists';

export const gistslist = {
    state:<gistStateFace>{
        view:gistview.row,
        gists:[]
    },
    reducers:{
        changegistview: (state:gistStateFace,payload:gistview)=>({...state, view: payload})
    }
}
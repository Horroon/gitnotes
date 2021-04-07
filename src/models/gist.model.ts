import {gistview, gistStateFace} from '../constants/models.interfaces/gists';

export const gistslist = {
    state:<gistStateFace>{
        view:gistview.row,
        gists:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    },
    reducers:{
        changegistview: (state:gistStateFace,payload:gistview)=>({...state, view: payload})
    }
}
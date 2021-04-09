import {paginationStateFace} from '../constants/models.interfaces/pagination';

export const pagination = {
    state:<paginationStateFace>{
        total_pages:2,
        current_page:1,
        showRecords:[],
        limit:{
            from: 0,
            to: 10,
            pagesize: 10,
            hasmore: true
        },
        buttons:{
            back: false,
            next: true
        }
    },
    reducers:{
        update_current_page:(state:paginationStateFace,payload:{current_page:number})=>({...state, ...payload}),
        update_total_pages:(state:paginationStateFace, payload:{total_pages:number})=>({...state, ...payload}),
        goToNext:(state:paginationStateFace, payload:{current_page:number})=>({...state, ...payload}),
        update_button_status:(state:paginationStateFace, payload:{back:boolean, next: boolean})=>({...state, buttons:{...payload}}),
        update_limit:(state:paginationStateFace, payload:{from:number, to: number, hasmore:boolean})=>({...state, limit:{ ...state.limit,...payload}}),
        update_hasmore_gist:(state:paginationStateFace, payload:boolean)=>({...state, limit:{...state.limit, hasmore: payload}}),
        update_show_records:(state:paginationStateFace, payload:any[])=>({...state, showRecords:payload})
    }
}
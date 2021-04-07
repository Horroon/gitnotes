import {paginationStateFace} from '../constants/models.interfaces/pagination';

export const pagination = {
    state:<paginationStateFace>{
        total_pages:'2',
        current_page:'1',
        limit:{
            from: 0,
            to: 10,
            pagesize: 10
        },
        buttons:{
            back: false,
            next: true
        }
    },
    reducers:{
        update_current_page:(state:paginationStateFace,payload:{current_page:string})=>({...state, ...payload}),
        update_total_pages:(state:paginationStateFace, payload:{total_pages:string})=>({...state, ...payload}),
        goToNext:(state:paginationStateFace, payload:{current_page:string})=>({...state, ...payload}),
        update_button_status:(state:paginationStateFace, payload:{back:boolean, next: boolean})=>({...state, buttons:{...payload}}),
        update_limit:(state:paginationStateFace, payload:{from:number, to: number})=>({...state, limit:{ pagesize: state.limit.pagesize, ...payload}}),
    }
}
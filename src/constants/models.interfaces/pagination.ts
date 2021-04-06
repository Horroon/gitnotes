export interface paginationStateFace {
    total_pages:string,
    current_page: string,
    limit:{
        from:number,
        to:number,
        pagesize: number
    },
    buttons:{
        next:boolean,
        back:boolean,
    }
}
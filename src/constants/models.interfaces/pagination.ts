export interface paginationStateFace {
    total_pages:number,
    current_page: number,
    showRecords:any[],
    limit:{
        from:number,
        to:number,
        pagesize: number,
        hasmore:boolean
    },
    buttons:{
        next:boolean,
        back:boolean,
    }
}
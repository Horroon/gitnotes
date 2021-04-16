export enum gistview {
    row='row',
    grid='grid'
}

export enum gistscope {
    user ='user',
    public='public'
}

export interface gistStateFace{
    view:gistview,
    gists:any[],
    searchgistId:string,
    scope:gistscope
}
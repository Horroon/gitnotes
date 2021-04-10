export enum gistview {
    row='row',
    grid='grid'
}

export interface gistStateFace{
    view:gistview,
    gists:any[],
    searchgistId:string,
}
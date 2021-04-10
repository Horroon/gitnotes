export const SearchRecordById = (id:string, data:any[])=>{
    return data.filter(gist=>(gist.owner.login).toLowerCase() === id);
}
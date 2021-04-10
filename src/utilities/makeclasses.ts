export const MakeClasses = (args:any)=>{
  let singlestr = ''
  for(let oneclass of args){
      singlestr += ' ' + oneclass
  }
  return singlestr
}
export const dateFormatter =(date:string)=>{
    return new Date(date).toLocaleDateString('en-US',{
        month:'long',
        day:'numeric',
        year:'numeric',
    })
}

export const timeFormatter = (time:string)=>{
    return new Date(time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
}
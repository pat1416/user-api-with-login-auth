export const transformResponse =(data:any,message:string,code:number,success:boolean,)=>{
    return {
          status:code,
          message:success?"success":message,
          success,
          data
    }
}


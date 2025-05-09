import { Response } from "express";
type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
type TSuccessResponse<T>={
    success?:boolean;
    statusCode:number;
    message:string;
    token?:string
    data: T | T[] | null
    meta?: TMeta | null
}
const sendResponse =<T>(res:Response,data:TSuccessResponse<T>)=>{
    res.status(data.statusCode).json({
        success:true,
        statusCode:data.statusCode,
        message:data.message,
        token:data.token,
        data: data.data,
        meta: data.meta,
    })
}
export default sendResponse 
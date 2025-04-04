import { NextFunction,Request,Response } from "express";
import { AnyZodObject } from "zod";
import catchAsYnc from "../utilits/catchAsync";
const validateRequest=(schema:AnyZodObject)=>{
    return catchAsYnc(async(req:Request,res:Response,next:NextFunction)=>{
        await schema.parseAsync({
            body:req.body,
        })
        next()
    })
}
export default validateRequest
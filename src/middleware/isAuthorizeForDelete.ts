
import type {  Request, Response ,NextFunction} from "express"
import { JwtPayload } from "jsonwebtoken";
import  { IssueServices } from "../modules/Issues/issues.services";
import sendResponse from "../utility/sendResponse";
import httpStatus from "http-status-codes"
export const  canDeleteIssues = async (req:Request,res:Response,next:NextFunction)=>{

       const user  = req.user as JwtPayload;
       
        

       if(user.role === "maintainer"){
          next()
       }else{

            return sendResponse(res,{
              statusCode: httpStatus.FORBIDDEN,
              success : false,
              message : "ForBidden. You Don't have Access to Delete the issue"
            })
          }
    

    
}
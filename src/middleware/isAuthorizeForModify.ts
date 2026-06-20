
import type {  Request, Response ,NextFunction} from "express"
import { JwtPayload } from "jsonwebtoken";
import  { IssueServices } from "../modules/Issues/issues.services";
import sendResponse from "../utility/sendResponse";
import httpStatus from "http-status-codes"
export const  canModifyIssues = async (req:Request,res:Response,next:NextFunction)=>{

       const user  = req.user as JwtPayload;
         const issueId =   Number(req.params.id);
         const issue = await IssueServices.GetIssueByIdIntoDb(issueId);

          if (!issue) {
          return sendResponse(res,{
            statusCode: httpStatus.NOT_FOUND,
            success : false,
            message : "issue Not Found"
          })
        }

       if(user.role === "maintainer"){
          next()
       }else if(user.role === "contributor" &&
         issue.reporter_id == user.id &&
         issue.status === "open"){
            return next();
          }else{

            return sendResponse(res,{
              statusCode: httpStatus.FORBIDDEN,
              success : false,
              message : "ForBidden. You Don't have Access to modify issue"
            })
          }
    


          // console.log(user);
          // console.log(issue)

    
}
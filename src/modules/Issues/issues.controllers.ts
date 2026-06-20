
import { Request, Response } from "express"
import sendResponse from "../../utility/sendResponse"
import httpStatus from "http-status-codes"
import { IssueServices } from "./issues.services"

const CreateIssue = async (req:Request, res:Response) =>{
    try {
        const reporterId = req.user!.id;
        
        const result = await IssueServices.CreateIssueIntoDb(req.body,reporterId);
        sendResponse(res,{
            statusCode: httpStatus.CREATED,
             success: true,
             message : "Issue created successfully",
             data :{
                id:result.id,
                title: result.title,
                description: result.description,
                type: result.type,
                status: result.status? result.status: "open",
                reporter_id: reporterId,
                created_at: result.created_at,
                updated_at: result.updated_at
             }
        })


    } catch (error) {
         sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while create issue",
            error: error 
        })
    }
}


const GetAllIssues = async (req: Request, res: Response) =>{
    try {

        const result = await IssueServices.GetAllIssueIntoDb(req.query);


            const finalData = result.map((issue) => ({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: {
                id: issue.reporter_id,
                name: issue.reporter_name,
                role: issue.reporter_role,
            },
            created_at: issue.created_at,
            updated_at: issue.updated_at,
            }));


         sendResponse(res,{
            statusCode: httpStatus.OK,
             success: true,
             message : "Issue featch successfully",
             data: finalData
        })

        
    } catch (error) {
         sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while Get All Issue",
            error: error 
         })
    }
}

const GetIssueById = async (req: Request, res: Response) =>{
    try {
          const id  = Number(req.params.id);
          const result = await IssueServices.GetIssueByIdIntoDb((id));

           const finalData = {
            id: result.id,
            title: result.title,
            description: result.description,
            type: result.type,
            status: result.status,
            reporter: {
                id: result.reporter_id,
                name: result.reporter_name,
                role: result.reporter_role,
            },
            created_at: result.created_at,
            updated_at: result.updated_at,
            };


         sendResponse(res,{
            statusCode: httpStatus.OK,
             success: true,
             message : "Issue retrived successfully ",
             data: finalData
        })



        
    } catch (error) {
          sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while Get Issue by id",
            error: error 
         })
    }
}

  
const updateIssueById = async (req: Request, res: Response) =>{
    try {
          const id  = Number(req.params.id);
          const result = await IssueServices.UpdateIssueByIdIntoDb(req.body,id);

           const finalData = {
            id: result.id,
            title: result.title,
            description: result.description,
            type: result.type,
            status: result.status,
            reporter_id:result.reporter_id,
            created_at: result.created_at,
            updated_at: result.updated_at,
            };


         sendResponse(res,{
            statusCode: httpStatus.OK,
             success: true,
             message : "Issue updated successfully ",
             data: finalData
        })



        
    } catch (error) {
          sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while UpDate Issue by id",
            error: error 
         })
    }
}

const DeleteIssueById = async (req: Request, res: Response) =>{
    try {
          const id  = Number(req.params.id);
          const result = await IssueServices.DeleteIssueByIdIntoDb(id);


         sendResponse(res,{
            statusCode: httpStatus.OK,
             success: true,
             message : "Issue deleted successfully "
        })



        
    } catch (error) {
          sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while Deleted Issue by id",
            error: error 
         })
    }
}



export const IssueController = {
     CreateIssue,
     GetAllIssues,
     GetIssueById,
     updateIssueById,
     DeleteIssueById
}
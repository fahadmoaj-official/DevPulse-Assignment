import type {Request, Response} from "express";
import { userService } from "./user.services";
import sendResponse from "../../utility/sendResponse";
import httpStatus from "http-status-codes";
import { generateAccessToken } from "../../utility/Token";

const signup = async (req: Request, res: Response) => {
     try{

        const {name,email,password,role} = req.body;

        const result = await userService.signupIntoDb(req.body);

        sendResponse(res, {
            statusCode: httpStatus.CREATED,
            success: true,
            message: "User registered successfully",
            data: {
                id : result.id,
                name : result.name,
                email : result.email,
                role : result.role,
                created_at : result.created_at,
                updated_at : result.updated_at
            }
        })


     }catch(error){
        sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: (error as Error).message,
            error: error 
        })
     }
}
const login = async (req: Request, res: Response) => {
     try{

        const result = await userService.loginIntoDb(req.body.email, req.body.password);


        const accessToken = generateAccessToken(result);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "User logged in successfully",
            data : {
                Token : accessToken, 
                user : {
                    id : result.id,
                    name : result.name,
                    email : result.email,
                    role : result.role,
                    created_at : result.created_at,
                    updated_at : result.updated_at
                }
            }
        })

     }catch(error){
        sendResponse(res, {
            statusCode: httpStatus.BAD_REQUEST,
            success: false,
            message: error instanceof Error ? error.message : "An error occurred while logging in",
            error: error 
        })
     }
}


export const userController = {
    signup,
    login
};
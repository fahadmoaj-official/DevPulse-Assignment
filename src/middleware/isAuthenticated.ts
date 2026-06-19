import { NextFunction, Request, Response } from "express"
import sendResponse from "../utility/sendResponse";
import httpStatus from "http-status-codes"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { env } from "../config/env";
import pool from "../config/db";


export const isAuthenticated = async  (req:Request,res:Response,next:NextFunction) =>{

    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return sendResponse(res,{
                statusCode:httpStatus.UNAUTHORIZED,
                success:false,
                message:"Unauthorized or Token not provide"
            })
        }

        const Token = authHeader.split(" ")[1];

        const decoded =  jwt.verify(Token,env.ACCESS_TOKEN_SECRET)as JwtPayload;

        const userData = await pool.query(`
            SELECT * FROM users WHERE id = $1 `, [decoded.id]
        )

        if(userData.rows.length ==0){
           return sendResponse(res,{
                statusCode:httpStatus.UNAUTHORIZED,
                success:false,
                message:"Unauthorized access, user not found"
            })
        }

        req.user = decoded

        console.log("user Data 1: ",decoded);


       next();
    } catch (error) {
        sendResponse(res,{
            statusCode:429,
            success:false,
            message: "Invalid or expired token, Please Log In ",
            error: error 
        })
    }
    

}
import { error } from "node:console";
import pool from "../../config/db";
import {Iissues} from "../Issues/issues.interface"

const CreateIssueIntoDb = async (payload:Iissues,reporterId:number) => {
      const {title,description,type} = payload;

      const result = await pool.query(`
         INSERT INTO issues (title, description, type, reporter_id)
            VALUES ($1, $2, $3,$4)
            RETURNING *
        `, [title, description, type, reporterId]);  

     return result.rows[0];

}

const GetAllIssueIntoDb = async() =>{
     const result = await pool.query(`
          SELECT 
            i.id,
            i.title,
            i.description,
            i.type,
            i.status,
            i.created_at,
            i.updated_at,

            u.id AS reporter_id,
            u.name AS reporter_name,
            u.role AS reporter_role

        FROM issues i
        JOIN users u ON i.reporter_id = u.id
        ORDER BY i.created_at DESC
        `)

        return result.rows;
}

const GetIssueByIdIntoDb = async (id:number) =>{

      


        const result = await pool.query(`
          SELECT 
            i.id,
            i.title,
            i.description,
            i.type,
            i.status,
            i.created_at,
            i.updated_at,

            u.id AS reporter_id,
            u.name AS reporter_name,
            u.role AS reporter_role

            FROM issues i
            JOIN users u ON i.reporter_id = u.id
            WHERE i.id = $1;
            `,[id])

             if (result.rows.length === 0) {
            throw new Error("Issue not exist");
            }


            return result.rows[0];
}


const UpdateIssueByIdIntoDb = async (payload:Iissues,id:number) => {
      const {title,description,type} = payload;

      const result = await pool.query(`
         UPDATE issues SET 
            title = $1,
            description = $2,
            type = $3
            WHERE id = $4
            RETURNING *
        `, [title, description, type, id]);  

          if (result.rows.length === 0) {
            throw new Error("Issue not exist");
            }


     return result.rows[0];

}


const DeleteIssueByIdIntoDb = async (id:number) => {
     

      const result = await pool.query(`
          DELETE FROM issues
            WHERE id = $1
            RETURNING *
        `, [ id]);  

          if (result.rows.length === 0) {
            throw new Error("Issue not exist");
            }


     return result.rows[0];

}


export const IssueServices = {
    CreateIssueIntoDb,
    GetAllIssueIntoDb,
    GetIssueByIdIntoDb,
    UpdateIssueByIdIntoDb,
    DeleteIssueByIdIntoDb
}
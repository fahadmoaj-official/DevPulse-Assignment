import { IUser, UserRole } from "./user.interface";
import  pool  from "../../config/db";
import sendResponse from "../../utility/sendResponse";
import bcrypt from "bcryptjs";


const signupIntoDb = async (payload : IUser) => {
        const {name,email,password,role} = payload;
        
        if(!name || !email || !password){
            throw new Error("All fields are required");
        }
        
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(userExist.rows.length > 0){
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool .query(`
            
            INSERT INTO users (name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `, [name, email, hashedPassword, role ]);

        delete newUser.rows[0].password;

        return newUser.rows[0];

}


const loginIntoDb = async (email: string, password: string) => {
    
    if(!email || !password){
        throw new Error("All fields are required");
    }

    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    
    if(userExist.rows.length === 0){
        throw new Error("User does not exist");
    }

    const PasswordMatch = await bcrypt.compare(password, userExist.rows[0].password);

    if(!PasswordMatch){
        throw new Error("Invalid credentials");
    }

    delete userExist.rows[0].password;

    return userExist.rows[0];
}


export const userService = {
    loginIntoDb,
    signupIntoDb
}
import pool from "../config/db";
import {connectDB} from "../config/db";


export const interactWithDB = async () => {
    try {
        await connectDB();

       await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(200) NOT NULL,

            role VARCHAR(20) NOT NULL DEFAULT 'contributor',
            CHECK (role IN ('maintainer', 'contributor')),

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

       await pool.query(`

        CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,

        description TEXT NOT NULL,
        CHECK (LENGTH(description) >= 20),

        type VARCHAR(20) NOT NULL,
        CHECK (type IN ('bug', 'feature_request')),

        status VARCHAR(20) NOT NULL DEFAULT 'open',
        CHECK (status IN ('open', 'in_progress', 'resolved')),

        reporter_id INT NOT NULL REFERENCES users(id),

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
 

        console.log("Database tables created successfully!");
    }catch (error) {
        console.error("Database Initialization Error:", error);
        throw error;
    }
}
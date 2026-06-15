import express from "express";
const app = express();
import {env} from './config/env';
import { interactWithDB } from "./db/index";




const main = async () => {
    try{
     await interactWithDB();

     
     app.listen(env.PORT, () => {
      console.log(`🚀 Server running on port ${env.PORT}`);
    });

  }catch(err){
    console.error("Failed To start Server", err);
    process.exit(1);
  

  }
}
  

main();

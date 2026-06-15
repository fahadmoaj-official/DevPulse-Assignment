import express from "express";
import cookieParser from "cookie-parser";
import type {Request, Response} from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({
    message: "Express Server is running successfully!",
    author: "MD Fahad Sarker (Fahad moaj)",
  });
});


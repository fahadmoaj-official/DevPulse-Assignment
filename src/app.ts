import express from "express";
import cookieParser from "cookie-parser";
import type {Request, Response} from "express";
import userRouter from "./modules/user/user.route";
import issueRouter from "./modules/Issues/issues.route"
import cors from "cors"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const corsOptions = {
  origin: "https://devpulse-one-dun.vercel.app", 
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/health", (req: Request, res: Response) => {
  
  res.status(200).json({
    message: "Express Server is running successfully!",
    author: "MD Fahad Sarker (Fahad moaj)",
  });
});


app.use("/api/auth", userRouter);
app.use("/api/issues", issueRouter);

export default app;

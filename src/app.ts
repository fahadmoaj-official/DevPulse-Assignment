import express from "express";
import cookieParser from "cookie-parser";
import type {Request, Response} from "express";
import userRouter from "./modules/user/user.route";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/health", (req: Request, res: Response) => {
  
  res.status(200).json({
    message: "Express Server is running successfully!",
    author: "MD Fahad Sarker (Fahad moaj)",
  });
});


app.use("/api/auth", userRouter);
// app.use("/api/issues", userRouter);

export default app;

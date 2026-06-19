import { Router } from "express";
import { IssueController } from "./issues.controllers";
import { isAuthenticated } from "../../middleware/isAuthenticated";
const router = Router();


router.post("/",isAuthenticated,IssueController.CreateIssue);
router.get("/",IssueController.GetAllIssues);



export default router;
import { Router } from "express";
import { IssueController } from "./issues.controllers";
import { isAuthenticated } from "../../middleware/isAuthenticated";
const router = Router();


router.post("/",isAuthenticated,IssueController.CreateIssue);
router.get("/",IssueController.GetAllIssues);
router.get("/:id",IssueController.GetIssueById);
router.patch("/:id",isAuthenticated,IssueController.updateIssueById);
router.delete("/:id",isAuthenticated,IssueController.DeleteIssueById);



export default router;
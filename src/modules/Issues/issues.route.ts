import { Router } from "express";
import { IssueController } from "./issues.controllers";
import { isAuthenticated } from "../../middleware/isAuthenticated";
import { canModifyIssues } from "../../middleware/isAuthorizeForModify";
const router = Router();


router.post("/",isAuthenticated,IssueController.CreateIssue);
router.get("/",IssueController.GetAllIssues);
router.get("/:id",IssueController.GetIssueById);
router.patch("/:id",isAuthenticated,canModifyIssues,IssueController.updateIssueById);
router.delete("/:id",isAuthenticated,IssueController.DeleteIssueById);



export default router;